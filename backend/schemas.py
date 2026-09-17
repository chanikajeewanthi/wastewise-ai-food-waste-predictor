"""
WasteWise AI - Smart Cafeteria Food Waste Prediction System
Branch: feature/backend

Request/response models for the backend REST API. 
"""

from pydantic import BaseModel, Field, field_validator

VALID_STAFF_EXPERIENCE = {"beginner", "intermediate", "expert"}


class WastePredictionRequest(BaseModel):
    meals_served: int = Field(..., gt=0, le=2000, description="Number of meals served that day")
    kitchen_staff: int = Field(..., gt=0, le=100, description="Number of kitchen staff on duty")
    temperature_C: float = Field(..., ge=-10, le=55, description="Ambient temperature in Celsius")
    humidity_percent: float = Field(..., ge=0, le=100, description="Relative humidity percentage")
    day_of_week: int = Field(..., ge=0, le=6, description="0=Monday ... 6=Sunday")
    special_event: int = Field(..., ge=0, le=1, description="1 if a special event occurred, else 0")
    past_waste_kg: float = Field(..., ge=0, le=500, description="Historical waste in kg")
    staff_experience: str = Field(..., description="beginner, intermediate, or expert")
    waste_category: str = Field(..., min_length=1, max_length=50)

    @field_validator("staff_experience")
    @classmethod
    def validate_staff_experience(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in VALID_STAFF_EXPERIENCE:
            raise ValueError(
                f"staff_experience must be one of {sorted(VALID_STAFF_EXPERIENCE)}, got '{value}'"
            )
        return normalized

    @field_validator("waste_category")
    @classmethod
    def validate_waste_category(cls, value: str) -> str:
        normalized = value.strip().lower()
        if not normalized:
            raise ValueError("waste_category cannot be empty or whitespace")
        return normalized

    class Config:
        json_schema_extra = {
            "example": {
                "meals_served": 220,
                "kitchen_staff": 12,
                "temperature_C": 26.5,
                "humidity_percent": 55.0,
                "day_of_week": 4,
                "special_event": 0,
                "past_waste_kg": 38.2,
                "staff_experience": "intermediate",
                "waste_category": "meat",
            }
        }


class WastePredictionResponse(BaseModel):
    predicted_food_waste_kg: float
