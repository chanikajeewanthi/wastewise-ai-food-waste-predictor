// function levelFromKg(kg) {
//   if (kg < 30) return { key: "low", label: "Low for this size of service" };
//   if (kg < 60) return { key: "moderate", label: "Typical range" };
//   return { key: "high", label: "Above typical — worth a closer look" };
// }

// export default function ResultPanel({ status, prediction, lastInput, errorMessage }) {
//   return (
//     <aside className="result-panel">
//       <p className="result-eyebrow">Forecast</p>
//       <h2 className="result-title">Expected food waste</h2>

//       {status === "error" && (
//         <div className="error-banner">{errorMessage}</div>
//       )}

//       {status === "idle" && (
//         <div className="result-empty">
//           <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
//             <path
//               d="M4 7h16M8 7V4h8v3M6 7l1 13h10l1-13"
//               stroke="currentColor"
//               strokeWidth="1.4"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <p>Fill in today's service details and forecast to see the expected waste here.</p>
//         </div>
//       )}

//       {status === "loading" && (
//         <div className="result-loading">
//           <div className="spinner" />
//           <span>Contacting the prediction service…</span>
//         </div>
//       )}

//       {status === "success" && prediction !== null && (
//         <>
//           <div className="result-value-block">
//             <div className="result-number">
//               {prediction.toFixed(1)}
//               <span className="unit">kg</span>
//             </div>
//             <div className="result-label">
//               {levelFromKg(prediction).label}
//             </div>

//             <div className="gauge-track">
//               <div
//                 className={`gauge-fill ${levelFromKg(prediction).key}`}
//                 style={{ width: `${Math.min((prediction / 100) * 100, 100)}%` }}
//               />
//             </div>
//             <div className="gauge-caption">Scaled against a 0–100kg service range</div>

//             <div className="result-divider" />

//             <div className="result-context">
//               <div className="result-context-row">
//                 <span>Meals served</span>
//                 <span>{lastInput?.meals_served}</span>
//               </div>
//               <div className="result-context-row">
//                 <span>Kitchen staff</span>
//                 <span>{lastInput?.kitchen_staff}</span>
//               </div>
//               <div className="result-context-row">
//                 <span>Past waste</span>
//                 <span>{lastInput?.past_waste_kg} kg</span>
//               </div>
//               <div className="result-context-row">
//                 <span>Category</span>
//                 <span>
//                   {lastInput?.waste_category &&
//                     lastInput.waste_category.charAt(0).toUpperCase() +
//                       lastInput.waste_category.slice(1)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </aside>
//   );
// }


function levelFromKg(kg) {
  if (kg < 30) {
    return {
      key: "low",
      label: "Low waste range",
      message: "A relatively low expected waste level.",
    };
  }

  if (kg < 60) {
    return {
      key: "moderate",
      label: "Typical waste range",
      message: "Within the typical service range.",
    };
  }

  return {
    key: "high",
    label: "Higher waste range",
    message: "Consider reviewing today's service plan.",
  };
}

export default function ResultPanel({
  status,
  prediction,
  lastInput,
  errorMessage,
}) {
  const level =
    prediction !== null ? levelFromKg(prediction) : null;

  return (
    <aside className={`result-panel ${status}`}>
      <div className="result-panel-glow" />

      <div className="result-top">
        <div>
          <span className="result-eyebrow">AI FORECAST</span>
          <h2 className="result-title">
            Expected food waste
          </h2>
        </div>

        <div className="ai-badge">
          <span>✦</span>
          AI
        </div>
      </div>

      {status === "idle" && (
        <div className="result-empty">
          <div className="result-orbit">
            <div className="result-orbit-icon">♻</div>
          </div>

          <h3>Ready when you are</h3>

          <p>
            Complete the service details and run a forecast
            to see your AI-powered prediction here.
          </p>

          <div className="result-hint">
            <span>01</span>
            Enter service data
            <span>02</span>
            Get prediction
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="result-loading">
          <div className="ai-loader">
            <span />
            <span />
            <span />
          </div>

          <h3>Analyzing your service...</h3>

          <p>
            WasteWise AI is processing your cafeteria inputs
            and generating a prediction.
          </p>

          <div className="loading-line">
            <span />
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="result-error">
          <div className="error-icon">!</div>

          <span className="result-eyebrow">PREDICTION ERROR</span>

          <h3>Something went wrong</h3>

          <p>{errorMessage}</p>

          <div className="error-tip">
            Check that both the backend and ML service are
            running, then try again.
          </div>
        </div>
      )}

      {status === "success" && prediction !== null && (
        <div className="result-success">
          <div className="success-label">
            PREDICTED WASTE
          </div>

          <div className="result-number">
            {prediction.toFixed(1)}
            <span>kg</span>
          </div>

          <div className={`result-status ${level.key}`}>
            <span>●</span>
            {level.label}
          </div>

          <p className="result-message">
            {level.message}
          </p>

          <div className="gauge-wrapper">
            <div className="gauge-labels">
              <span>0 kg</span>
              <span>100 kg</span>
            </div>

            <div className="gauge-track">
              <div
                className={`gauge-fill ${level.key}`}
                style={{
                  width: `${Math.min(
                    (prediction / 100) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="result-divider" />

          <div className="result-context">
            <div>
              <span>Meals served</span>
              <strong>{lastInput?.meals_served}</strong>
            </div>

            <div>
              <span>Kitchen staff</span>
              <strong>{lastInput?.kitchen_staff}</strong>
            </div>

            <div>
              <span>Past waste</span>
              <strong>{lastInput?.past_waste_kg} kg</strong>
            </div>

            <div>
              <span>Category</span>
              <strong className="capitalize">
                {lastInput?.waste_category}
              </strong>
            </div>
          </div>

          <div className="prediction-complete">
            <span>✓</span>
            Prediction saved to history
          </div>
        </div>
      )}
    </aside>
  );
}