// import { useState } from "react";
// import WasteForm from "./WasteForm.jsx";
// import ResultPanel from "./ResultPanel.jsx";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// export default function NewForecast({ onForecastComplete }) {
//   const [status, setStatus] = useState("idle");
//   const [prediction, setPrediction] = useState(null);
//   const [lastInput, setLastInput] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");

//   async function handleSubmit(payload) {
//     setStatus("loading");
//     setErrorMessage("");
//     setLastInput(payload);

//     try {
//       const res = await fetch(`${BACKEND_URL}/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const body = await res.json().catch(() => null);

//       if (!res.ok) {
//         const detail =
//           (body && body.detail) ||
//           "The prediction service returned an error. Please try again.";
//         setStatus("error");
//         setErrorMessage(typeof detail === "string" ? detail : JSON.stringify(detail));
//         return;
//       }

//       setPrediction(body.predicted_food_waste_kg);
//       setStatus("success");
//       onForecastComplete(payload, body.predicted_food_waste_kg);
//     } catch {
//       setStatus("error");
//       setErrorMessage(
//         "Could not reach the backend. Confirm it's running at " + BACKEND_URL + "."
//       );
//     }
//   }

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <p className="page-eyebrow">Forecast</p>
//           <h2 className="page-title">New forecast</h2>
//         </div>
//       </div>

//       <div className="layout">
//         <WasteForm onSubmit={handleSubmit} isLoading={status === "loading"} />
//         <ResultPanel
//           status={status}
//           prediction={prediction}
//           lastInput={lastInput}
//           errorMessage={errorMessage}
//         />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import WasteForm from "./WasteForm.jsx";
import ResultPanel from "./ResultPanel.jsx";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function NewForecast({ onForecastComplete }) {
  const [status, setStatus] = useState("idle");
  const [prediction, setPrediction] = useState(null);
  const [lastInput, setLastInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(payload) {
    setStatus("loading");
    setErrorMessage("");
    setLastInput(payload);

    try {
      const res = await fetch(`${BACKEND_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await res.json().catch(() => null);

      if (!res.ok) {
        const detail =
          (body && body.detail) ||
          "The prediction service returned an error. Please try again.";

        setStatus("error");
        setErrorMessage(
          typeof detail === "string"
            ? detail
            : JSON.stringify(detail)
        );
        return;
      }

      setPrediction(body.predicted_food_waste_kg);
      setStatus("success");

      onForecastComplete(
        payload,
        body.predicted_food_waste_kg
      );
    } catch {
      setStatus("error");
      setErrorMessage(
        "Could not reach the backend. Confirm it's running at " +
          BACKEND_URL +
          "."
      );
    }
  }

  return (
    <div className="page forecast-page">
      <div className="page-header forecast-header">
        <div>
          <div className="welcome-pill small-pill">
            <span className="sparkle">✦</span>
            AI forecasting engine
          </div>

          <span className="page-eyebrow">PREDICTION WORKSPACE</span>

          <h1 className="page-title">
            New <em>forecast</em>
          </h1>

          <p className="page-subtitle">
            Tell us about today's cafeteria service and let
            WasteWise estimate the expected food waste.
          </p>
        </div>
      </div>

      <div className="forecast-layout">
        <WasteForm
          onSubmit={handleSubmit}
          isLoading={status === "loading"}
        />

        <ResultPanel
          status={status}
          prediction={prediction}
          lastInput={lastInput}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}