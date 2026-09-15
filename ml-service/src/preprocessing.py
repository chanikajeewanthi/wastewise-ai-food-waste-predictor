from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

NUMERIC_FEATURES = [
    "meals_served",
    "kitchen_staff",
    "temperature_C",
    "humidity_percent",
    "day_of_week",
    "special_event",
    "past_waste_kg",
]
OUTLIER_COLUMNS = ["meals_served", "temperature_C"]
TARGET_COLUMN = "food_waste_kg"


# Loading and cleaning

def load_raw_data(path: str) -> pd.DataFrame:
    return pd.read_csv(path)


def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Drop ID, standardize staff_experience/waste_category text casing."""
    df = df.copy()

    if "ID" in df.columns:
        df = df.drop(columns=["ID"])

    for col in ["staff_experience", "waste_category"]:
        if col in df.columns:
            df[col] = (
                df[col]
                .astype(object)
                .where(df[col].notna(), np.nan)
            )
            df[col] = df[col].apply(
                lambda v: v.strip().lower() if isinstance(v, str) else v
            )
            df[col] = df[col].replace({"nan": np.nan, "none": np.nan, "": np.nan})

    return df


# Outlier treatment
def get_iqr_bounds(series: pd.Series, factor: float = 1.5):
    q1 = series.quantile(0.25)
    q3 = series.quantile(0.75)
    iqr = q3 - q1
    return q1 - factor * iqr, q3 + factor * iqr


def compute_outlier_bounds(df: pd.DataFrame, columns=None) -> dict:
    columns = columns or OUTLIER_COLUMNS
    return {col: get_iqr_bounds(df[col]) for col in columns}


def apply_outlier_bounds(df: pd.DataFrame, bounds: dict) -> pd.DataFrame:
    df = df.copy()
    for col, (lower, upper) in bounds.items():
        df[col] = df[col].clip(lower, upper)
    return df


# Fit / transform
def fit_preprocessing(X_train: pd.DataFrame):
    """
    Fits outlier bounds, the numeric scaler, and the categorical
    imputer/encoders on TRAINING data only.

    Returns:
        X_train_processed (pd.DataFrame): transformed training features,
            with readable column names.
        artifacts (dict): {"scaler_bundle": ..., "encoders_bundle": ...},
            ready to be saved with save_artifacts().
    """
    X_train = X_train.copy()

    # 1. Outlier treatment
    outlier_bounds = compute_outlier_bounds(X_train, OUTLIER_COLUMNS)
    X_train = apply_outlier_bounds(X_train, outlier_bounds)


    # 2. staff_experience: impute missing values, then one-hot encode
    staff_imputer = SimpleImputer(strategy="most_frequent")
    staff_train_imputed = staff_imputer.fit_transform(X_train[["staff_experience"]])

    staff_encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    staff_train_encoded = staff_encoder.fit_transform(staff_train_imputed)
    staff_feature_names = staff_encoder.get_feature_names_out(["staff_experience"])


    # 3. waste_category: no missing values expected, one-hot encode
    category_encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)
    category_train_encoded = category_encoder.fit_transform(X_train[["waste_category"]])
    category_feature_names = category_encoder.get_feature_names_out(["waste_category"])


    # 4. Numeric scaling
    scaler = StandardScaler()
    numeric_train_scaled = scaler.fit_transform(X_train[NUMERIC_FEATURES])

    X_train_processed = _assemble(
        numeric_train_scaled, staff_train_encoded, category_train_encoded,
        staff_feature_names, category_feature_names, X_train.index,
    )

    artifacts = {
        "scaler_bundle": {
            "scaler": scaler,
            "numeric_features": NUMERIC_FEATURES,
            "outlier_bounds": outlier_bounds,
        },
        "encoders_bundle": {
            "staff_imputer": staff_imputer,
            "staff_encoder": staff_encoder,
            "category_encoder": category_encoder,
        },
    }

    return X_train_processed, artifacts


def transform_preprocessing(df: pd.DataFrame, artifacts: dict) -> pd.DataFrame:
    """
    Applies previously-fitted outlier bounds, scaler, and encoders to new
    data (the test split, or a single row at inference time in the FastAPI
    backend). Nothing is re-fit - every statistic comes from `artifacts`,
    which was produced by fit_preprocessing() on TRAIN data only.
    """
    df = df.copy()
    scaler_bundle = artifacts["scaler_bundle"]
    encoders_bundle = artifacts["encoders_bundle"]

    df = apply_outlier_bounds(df, scaler_bundle["outlier_bounds"])

    staff_imputed = encoders_bundle["staff_imputer"].transform(df[["staff_experience"]])
    staff_encoded = encoders_bundle["staff_encoder"].transform(staff_imputed)
    staff_feature_names = encoders_bundle["staff_encoder"].get_feature_names_out(["staff_experience"])

    category_encoded = encoders_bundle["category_encoder"].transform(df[["waste_category"]])
    category_feature_names = encoders_bundle["category_encoder"].get_feature_names_out(["waste_category"])

    numeric_scaled = scaler_bundle["scaler"].transform(df[scaler_bundle["numeric_features"]])

    return _assemble(
        numeric_scaled, staff_encoded, category_encoded,
        staff_feature_names, category_feature_names, df.index,
    )


def _assemble(numeric_scaled, staff_encoded, category_encoded,
              staff_feature_names, category_feature_names, index):
    df_out = pd.DataFrame(numeric_scaled, columns=NUMERIC_FEATURES, index=index)
    df_out[list(staff_feature_names)] = staff_encoded
    df_out[list(category_feature_names)] = category_encoded
    return df_out


# Save / load artifacts
def save_artifacts(artifacts: dict, out_dir: str):
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    joblib.dump(artifacts["scaler_bundle"], out_dir / "scaler.pkl")
    joblib.dump(artifacts["encoders_bundle"], out_dir / "encoders.pkl")


def load_artifacts(in_dir: str) -> dict:
    in_dir = Path(in_dir)
    return {
        "scaler_bundle": joblib.load(in_dir / "scaler.pkl"),
        "encoders_bundle": joblib.load(in_dir / "encoders.pkl"),
    }
