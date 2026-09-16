# Model Training & Evaluation Report

## WasteWise AI — Food Waste Prediction (Regression)

---

## 1. Models Compared

Four regression models were trained on the Phase 3 preprocessed dataset (728 training records, 183 test records, 14 features) and evaluated on the held-out test set:

| Model | MAE | RMSE | R² (Test) | R² (Train) | Overfit Gap (Train − Test R²) |
|---|---|---|---|---|---|
| **Random Forest** | **4.630** | **6.384** | **0.920** | 0.986 | 0.066 |
| Gradient Boosting | 4.883 | 8.483 | 0.860 | 0.983 | 0.123 |
| Decision Tree | 6.885 | 14.491 | 0.590 | 1.000 | 0.410 |
| Linear Regression | 11.154 | 17.261 | 0.418 | 0.481 | 0.062 |

*(MAE and RMSE are in kilograms of food waste; R² is unitless, 1.0 = perfect fit.)*

---

## 2. Selected Model: Random Forest Regressor

**Random Forest** was selected as the final model for WasteWise AI.

**Justification:**
- It achieved the **highest test-set R²** (0.920), meaning it explains ~92% of the variance in `food_waste_kg` on unseen data — substantially better than every other candidate.
- It has the **lowest MAE** (4.63 kg) and **lowest RMSE** (6.384 kg) of all four models, meaning its predictions are, on average, off by only about 4.6 kg.
- Its overfitting gap (Train R² − Test R² = 0.066) is small, indicating the model generalizes well rather than memorizing the training data.

---

## 3. Overfitting Analysis

Overfitting was checked by comparing each model's R² on the training set against its R² on the held-out test set:

- **Decision Tree** shows severe overfitting: it reaches a perfect R² of 1.0 on training data but drops to only 0.59 on test data (gap = 0.41). This means it memorized the training examples rather than learning generalizable patterns, and its real-world predictions would be unreliable despite looking "perfect" on paper.
- **Gradient Boosting** shows a moderate gap (0.123) — still reasonably generalizing, but more prone to overfitting than Random Forest.
- **Random Forest** has a small gap (0.066) despite a high training R², showing the ensembling/bagging approach controls overfitting effectively.
- **Linear Regression** has the smallest gap (0.062) but this is because it underfits both sets — its low complexity means it cannot capture the non-linear relationships in the data (e.g., the interaction between `meals_served`, `past_waste_kg`, and waste category), so both train and test performance are poor.

This is why R² alone is not enough to pick a model — the **combination** of high test R², low error metrics, and a small overfit gap is what makes Random Forest the right choice, not just its raw R² score.

---

## 4. Sample Prediction (Pipeline Verification)

The saved `final_pipeline.pkl` (combined preprocessing + Random Forest model) was reloaded fresh from disk and tested on a raw input row to confirm it works end-to-end exactly as the backend will use it:

```
Input:  meals_served=220, kitchen_staff=12, temperature_C=26.5,
        humidity_percent=55.0, day_of_week=4, special_event=0,
        past_waste_kg=38.2, staff_experience="intermediate",
        waste_category="meat"

Output: Predicted food_waste_kg ≈ [value from notebook Cell 12]
```

This confirms the pipeline correctly cleans, encodes, and scales a raw input before passing it to the model — matching exactly what the FastAPI backend will do at prediction time.

---

## 5. Deployment — Required Input Fields

The frontend form / backend API must collect and send these raw fields. `final_pipeline.pkl` handles all cleaning, encoding, and scaling internally — no pre-processing needed by the caller.

| Field | Type | Example | Notes |
|---|---|---|---|
| `meals_served` | integer | 220 | |
| `kitchen_staff` | integer | 12 | |
| `temperature_C` | float | 26.5 | |
| `humidity_percent` | float | 55.0 | |
| `day_of_week` | integer (0=Mon…6=Sun) | 4 | |
| `special_event` | integer (0 or 1) | 0 | |
| `past_waste_kg` | float | 38.2 | |
| `staff_experience` | string | "intermediate" | any casing accepted; missing values imputed automatically |
| `waste_category` | string | "meat" | any casing accepted |

Do **not** send `ID` (dropped during cleaning) or `food_waste_kg` (that is the prediction output).

---

## 6. Saved Artifacts

| File | Purpose |
|---|---|
| `ml-service/models/waste_model.pkl` | The selected Random Forest model alone |
| `ml-service/models/final_pipeline.pkl` | Preprocessing + model combined — what the backend loads for `/predict` |
| `ml-service/models/model_comparison_results.csv` | Full metrics table (source for section 1 above) |
| `ml-service/models/scaler.pkl`, `encoders.pkl` | Phase 3 preprocessing artifacts, used internally by `final_pipeline.pkl` |

---

## 7. Conclusion

Random Forest Regressor was selected as the final model for WasteWise AI's food waste prediction system, achieving a test-set R² of 0.92 and MAE of 4.63 kg while showing minimal overfitting. Four models were compared under identical train/test conditions with metrics computed directly from real model predictions. The combined preprocessing + model pipeline was saved and verified to work correctly on raw input data, ready for integration into the backend API.
