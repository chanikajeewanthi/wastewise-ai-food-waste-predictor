# WasteWise AI — Frontend

React (Vite) app with four sections: a dashboard, the forecast form, a local
history of past forecasts, and a model-info page for demos/viva. Calls the
backend's `POST /predict` endpoint to forecast expected food waste in kg.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. By default it calls the backend at
`http://localhost:8000`. To point at a different backend URL, create a
`.env` file in this folder:

```
VITE_BACKEND_URL=http://localhost:8000
```

## What it sends to `/predict`

Matches `backend/schemas.py` exactly:

```json
{
  "meals_served": 220,
  "kitchen_staff": 12,
  "temperature_C": 26.5,
  "humidity_percent": 55.0,
  "day_of_week": 4,
  "special_event": 0,
  "past_waste_kg": 38.2,
  "staff_experience": "intermediate",
  "waste_category": "meat"
}
```

Client-side validation mirrors the backend's Pydantic field constraints
(ranges for meals_served, kitchen_staff, temperature_C, humidity_percent,
past_waste_kg) so obviously invalid input is caught before the request is
sent.

## Pages

- **Dashboard** — summary stats (forecasts run, average predicted waste,
  special-event count, backend status) and the most recent forecast.
- **New forecast** — the input form and live prediction result.
- **History** — every forecast made on this device, stored in
  `localStorage` so it survives a page refresh.
- **Model info** — the preprocessing → model pipeline, the four-model
  comparison table (MAE/RMSE/R²), and the exact input fields the API
  expects. Useful for the viva/demo.

## Structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx                    # sidebar nav, page routing, backend health check
    ├── index.css                  # design tokens + all styling
    ├── hooks/
    │   └── useForecastHistory.js  # localStorage-backed forecast history
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── NewForecast.jsx        # wraps WasteForm + ResultPanel, calls /predict
    │   ├── History.jsx
    │   └── ModelInfo.jsx
    └── components/
        ├── WasteForm.jsx          # grouped input form with inline validation
        └── ResultPanel.jsx        # prediction display with a waste-level gauge
```

