import sys
from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# ---------------------------------------------------------
# Allow imports from ml-service/src
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
SRC_DIR = BASE_DIR / "src"
MODEL_PATH = BASE_DIR / "models" / "final_pipeline.pkl"

sys.path.append(str(SRC_DIR))

from pipeline import WasteWiseFullPipeline

# Compatibility for the existing final_pipeline.pkl
# The pipeline was originally saved when WasteWiseFullPipeline
# existed in __main__.
import __main__
__main__.WasteWiseFullPipeline = WasteWiseFullPipeline


# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------

app = FastAPI(
    title="WasteWise AI - ML Prediction API",
    description="API for predicting cafeteria food waste.",
    version="1.0.0"
)


# ---------------------------------------------------------
# Load trained ML pipeline
# ---------------------------------------------------------

try:
    model = joblib.load(MODEL_PATH)
    print("WasteWise ML pipeline loaded successfully.")
except Exception as e:
    print(f"Error loading ML pipeline: {e}")
    model = None


# ---------------------------------------------------------
# Input schema
# ---------------------------------------------------------

class WastePredictionInput(BaseModel):
    meals_served: int
    kitchen_staff: int
    temperature_C: float
    humidity_percent: float
    day_of_week: int
    special_event: int
    past_waste_kg: float
    staff_experience: str
    waste_category: str


# ---------------------------------------------------------
# Home endpoint
# ---------------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "WasteWise AI ML API is running"
    }


# ---------------------------------------------------------
# Prediction endpoint
# ---------------------------------------------------------

@app.post("/predict")
def predict_waste(data: WastePredictionInput):

    if model is None:
        raise HTTPException(
            status_code=500,
            detail="ML model is not loaded."
        )

    try:
        input_df = pd.DataFrame([data.model_dump()])

        prediction = model.predict(input_df)

        predicted_waste = float(prediction[0])

        return {
            "predicted_food_waste_kg": round(predicted_waste, 2)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )