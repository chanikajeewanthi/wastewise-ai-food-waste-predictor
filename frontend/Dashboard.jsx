// function average(nums) {
//   if (nums.length === 0) return 0;
//   return nums.reduce((a, b) => a + b, 0) / nums.length;
// }

// export default function Dashboard({ history, backendHealth, onNavigate }) {
//   const predictions = history.map((h) => h.predictedKg);
//   const avgWaste = average(predictions);
//   const lastEntry = history[0];
//   const eventDays = history.filter((h) => h.input.special_event === 1).length;

//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <p className="page-eyebrow">Overview</p>
//           <h2 className="page-title">Dashboard</h2>
//         </div>
//         <button className="primary-btn" onClick={() => onNavigate("forecast")}>
//           New forecast
//         </button>
//       </div>

//       <div className="stat-grid">
//         <div className="stat-card">
//           <p className="stat-label">Forecasts run</p>
//           <p className="stat-value">{history.length}</p>
//           <p className="stat-foot">stored on this device</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">Average predicted waste</p>
//           <p className="stat-value">
//             {history.length ? avgWaste.toFixed(1) : "—"}
//             {history.length > 0 && <span className="stat-unit">kg</span>}
//           </p>
//           <p className="stat-foot">across all forecasts</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">Special-event forecasts</p>
//           <p className="stat-value">{eventDays}</p>
//           <p className="stat-foot">of {history.length} total</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">ML service</p>
//           <p className={`stat-value stat-status ${backendHealth}`}>
//             {backendHealth === "ok" ? "Online" : backendHealth === "down" ? "Offline" : "Checking"}
//           </p>
//           <p className="stat-foot">backend connection</p>
//         </div>
//       </div>

//       <div className="panel">
//         <div className="panel-header">
//           <h3>Most recent forecast</h3>
//           {lastEntry && (
//             <button className="text-btn" onClick={() => onNavigate("history")}>
//               View all
//             </button>
//           )}
//         </div>

//         {!lastEntry && (
//           <div className="empty-block">
//             <p>No forecasts yet. Run one to see it summarized here.</p>
//             <button className="primary-btn" onClick={() => onNavigate("forecast")}>
//               Run your first forecast
//             </button>
//           </div>
//         )}

//         {lastEntry && (
//           <div className="recent-row">
//             <div className="recent-number">
//               {lastEntry.predictedKg.toFixed(1)}
//               <span className="unit">kg</span>
//             </div>
//             <div className="recent-meta">
//               <p>
//                 {lastEntry.input.meals_served} meals · {lastEntry.input.kitchen_staff} staff ·{" "}
//                 {lastEntry.input.waste_category}
//               </p>
//               <p className="recent-time">
//                 {new Date(lastEntry.timestamp).toLocaleString()}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="panel">
//         <div className="panel-header">
//           <h3>About this tool</h3>
//         </div>
//         <p className="about-copy">
//           WasteWise AI predicts expected cafeteria food waste in kilograms from
//           operational, environmental, and historical inputs, using a Random
//           Forest regression model trained on past service records. See{" "}
//           <button className="link-btn" onClick={() => onNavigate("model")}>
//             Model Info
//           </button>{" "}
//           for how it was built and evaluated.
//         </p>
//       </div>
//     </div>
//   );
// }

function average(nums) {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function StatIcon({ type }) {
  if (type === "forecast") return <span>✦</span>;
  if (type === "waste") return <span>♻</span>;
  if (type === "event") return <span>◈</span>;
  return <span>●</span>;
}

export default function Dashboard({
  history,
  backendHealth,
  onNavigate,
}) {
  const predictions = history.map((h) => h.predictedKg);
  const avgWaste = average(predictions);
  const lastEntry = history[0];
  const eventDays = history.filter(
    (h) => h.input.special_event === 1
  ).length;

  return (
    <div className="page">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="welcome-pill">
            <span className="pulse-dot" />
            AI-powered cafeteria intelligence
          </div>

          <p className="page-eyebrow">GOOD TO SEE YOU</p>

          <h1 className="page-title hero-title">
            Make every meal
            <br />
            <em>count.</em>
          </h1>

          <p className="hero-description">
            Predict food waste before it happens and make smarter
            cafeteria decisions with WasteWise AI.
          </p>

          <button
            className="primary-btn hero-btn"
            onClick={() => onNavigate("forecast")}
          >
            <span>Start a new forecast</span>
            <span className="btn-arrow">→</span>
          </button>
        </div>

        <div className="hero-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <div className="leaf-illustration">
            <svg viewBox="0 0 220 220" fill="none">
              <path
                d="M175 45C113 45 53 79 53 137c0 29 23 47 51 47 52 0 79-53 71-139Z"
                fill="currentColor"
              />
              <path
                d="M54 178C83 127 119 94 168 69"
                stroke="white"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M99 124c-16-5-28-14-39-27"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                opacity=".7"
              />
            </svg>
          </div>

          <div className="hero-floating-card">
            <span className="mini-icon">AI</span>
            <div>
              <strong>Smart prediction</strong>
              <small>Ready to forecast</small>
            </div>
            <span className="floating-check">✓</span>
          </div>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <span className="section-kicker">YOUR ACTIVITY</span>
          <h2>At a glance</h2>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card stat-card-green">
          <div className="stat-card-top">
            <div className="stat-icon">
              <StatIcon type="forecast" />
            </div>
            <span className="stat-mini-label">TOTAL</span>
          </div>

          <p className="stat-label">Forecasts run</p>
          <p className="stat-value">{history.length}</p>
          <p className="stat-foot">Saved on this device</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon soft">
              <StatIcon type="waste" />
            </div>
            <span className="stat-mini-label">AVERAGE</span>
          </div>

          <p className="stat-label">Predicted waste</p>
          <p className="stat-value">
            {history.length ? avgWaste.toFixed(1) : "—"}
            {history.length > 0 && (
              <span className="stat-unit">kg</span>
            )}
          </p>
          <p className="stat-foot">Across all forecasts</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon soft">
              <StatIcon type="event" />
            </div>
            <span className="stat-mini-label">EVENTS</span>
          </div>

          <p className="stat-label">Special-event forecasts</p>
          <p className="stat-value">{eventDays}</p>
          <p className="stat-foot">{history.length} total forecasts</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <div className="stat-icon online-icon">
              <StatIcon type="service" />
            </div>
            <span className="stat-mini-label">STATUS</span>
          </div>

          <p className="stat-label">ML service</p>
          <p
            className={`stat-value stat-status ${backendHealth}`}
          >
            {backendHealth === "ok"
              ? "Online"
              : backendHealth === "down"
              ? "Offline"
              : "Checking"}
          </p>
          <p className="stat-foot">Prediction service</p>
        </div>
      </div>

      <div className="dashboard-columns">
        <section className="panel recent-panel">
          <div className="panel-header">
            <div>
              <span className="panel-kicker">LATEST RESULT</span>
              <h3>Most recent forecast</h3>
            </div>

            {lastEntry && (
              <button
                className="text-btn"
                onClick={() => onNavigate("history")}
              >
                View history →
              </button>
            )}
          </div>

          {!lastEntry && (
            <div className="empty-block beautiful-empty">
              <div className="empty-illustration">♻</div>
              <h4>Your waste story starts here</h4>
              <p>
                Run your first forecast to see an intelligent
                estimate of today's expected food waste.
              </p>
              <button
                className="secondary-btn"
                onClick={() => onNavigate("forecast")}
              >
                Create first forecast
              </button>
            </div>
          )}

          {lastEntry && (
            <div className="recent-result">
              <div className="recent-result-main">
                <span className="result-caption">
                  EXPECTED FOOD WASTE
                </span>

                <div className="recent-number">
                  {lastEntry.predictedKg.toFixed(1)}
                  <span>kg</span>
                </div>

                <div className="result-badge">
                  <span>●</span>
                  AI prediction complete
                </div>
              </div>

              <div className="recent-details">
                <div>
                  <span>Meals served</span>
                  <strong>{lastEntry.input.meals_served}</strong>
                </div>

                <div>
                  <span>Kitchen staff</span>
                  <strong>{lastEntry.input.kitchen_staff}</strong>
                </div>

                <div>
                  <span>Category</span>
                  <strong className="capitalize">
                    {lastEntry.input.waste_category}
                  </strong>
                </div>

                <div>
                  <span>Forecasted</span>
                  <strong>
                    {new Date(
                      lastEntry.timestamp
                    ).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="panel about-panel">
          <div className="about-symbol">
            <span>✦</span>
          </div>

          <span className="panel-kicker">ABOUT WASTEWISE</span>

          <h3>Turn data into less waste.</h3>

          <p className="about-copy">
            WasteWise AI predicts expected cafeteria food waste
            using operational, environmental, and historical
            information.
          </p>

          <div className="about-feature">
            <span>01</span>
            <p>Operational inputs</p>
          </div>

          <div className="about-feature">
            <span>02</span>
            <p>Smart preprocessing</p>
          </div>

          <div className="about-feature">
            <span>03</span>
            <p>Random Forest prediction</p>
          </div>

          <button
            className="link-btn about-link"
            onClick={() => onNavigate("model")}
          >
            Explore the model →
          </button>
        </section>
      </div>
    </div>
  );
}
