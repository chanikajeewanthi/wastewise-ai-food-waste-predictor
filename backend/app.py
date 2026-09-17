"""
WasteWise AI - Smart Cafeteria Food Waste Prediction System
Branch: feature/backend

Responsibility (per the confirmed implementation plan):
    Receive request -> validate -> call ML service -> return prediction -> error handling
"""

import os

import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from schemas import WastePredictionRequest, WastePredictionResponse

# Configuration

ML_API_BASE_URL = os.getenv("ML_API_BASE_URL", "http://localhost:8001")
ML_API_PREDICT_URL = f"{ML_API_BASE_URL}/predict"
ML_API_TIMEOUT_SECONDS = float(os.getenv("ML_API_TIMEOUT_SECONDS", "10"))

app = FastAPI(
    title="WasteWise AI - Backend API",
    description="Receives prediction requests from the frontend, validates them, "
                 "and forwards them to the ML prediction service.",
    version="1.0.0",
)

# Allow the frontend to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this to the actual frontend origin before deployment
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "WasteWise AI Backend API is running"}


@app.get("/health")
async def health():
#    Reports this service's status and its current connectivity to the ML-API for easier troubleshooting.

    ml_api_status = "unreachable"
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            response = await client.get(f"{ML_API_BASE_URL}/")
            if response.status_code == 200:
                ml_api_status = "reachable"
    except httpx.RequestError:
        pass

    return {
        "backend_status": "ok",
        "ml_api_status": ml_api_status,
        "ml_api_url": ML_API_BASE_URL,
    }


@app.post("/predict", response_model=WastePredictionResponse)
async def predict_waste(data: WastePredictionRequest):

    payload = data.model_dump()

    try:
        async with httpx.AsyncClient(timeout=ML_API_TIMEOUT_SECONDS) as client:
            ml_response = await client.post(ML_API_PREDICT_URL, json=payload)

    except httpx.ConnectError:
        raise HTTPException(
            status_code=503,
            detail="Could not connect to the ML prediction service. Please try again shortly.",
        )
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="The ML prediction service took too long to respond. Please try again.",
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=502,
            detail="An error occurred while contacting the ML prediction service.",
        )

    if ml_response.status_code != 200:
        # Forward the ML-API's own error message where possible, but never
        # forward a raw traceback - fall back to a generic message if the
        # response body isn't the JSON shape we expect.
        try:
            detail = ml_response.json().get("detail", "The ML prediction service returned an error.")
        except ValueError:
            detail = "The ML prediction service returned an unexpected response."

        raise HTTPException(status_code=502, detail=f"ML service error: {detail}")

    try:
        result = ml_response.json()
        predicted_value = result["predicted_food_waste_kg"]
    except (ValueError, KeyError):
        raise HTTPException(
            status_code=502,
            detail="The ML prediction service returned an unexpected response format.",
        )

    return WastePredictionResponse(predicted_food_waste_kg=predicted_value)
