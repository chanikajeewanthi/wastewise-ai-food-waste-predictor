// const METRICS = [
//   { model: "Random Forest", mae: 4.630, rmse: 6.384, r2Test: 0.920, r2Train: 0.986, selected: true },
//   { model: "Gradient Boosting", mae: 4.883, rmse: 8.483, r2Test: 0.860, r2Train: 0.983, selected: false },
//   { model: "Decision Tree", mae: 6.885, rmse: 14.491, r2Test: 0.590, r2Train: 1.000, selected: false },
//   { model: "Linear Regression", mae: 11.154, rmse: 17.261, r2Test: 0.418, r2Train: 0.481, selected: false },
// ];

// const FIELDS = [
//   ["meals_served", "Number of meals served that day"],
//   ["kitchen_staff", "Number of kitchen staff on duty"],
//   ["temperature_C", "Ambient temperature (°C)"],
//   ["humidity_percent", "Relative humidity (%)"],
//   ["day_of_week", "0 = Monday … 6 = Sunday"],
//   ["special_event", "1 if a special event occurred, else 0"],
//   ["past_waste_kg", "Historical waste from a comparable day (kg)"],
//   ["staff_experience", "beginner / intermediate / expert"],
//   ["waste_category", "Primary category of food being served"],
// ];

// export default function ModelInfo() {
//   return (
//     <div className="page">
//       <div className="page-header">
//         <div>
//           <p className="page-eyebrow">Under the hood</p>
//           <h2 className="page-title">Model info</h2>
//         </div>
//       </div>

//       <div className="panel">
//         <div className="panel-header">
//           <h3>Pipeline</h3>
//         </div>
//         <p className="about-copy">
//           Raw service data is cleaned (missing values imputed, category text
//           standardized), outlier-treated, one-hot encoded, and scaled before
//           being passed to the model. The frontend only sends raw fields — the
//           backend's saved pipeline handles every preprocessing step
//           internally.
//         </p>
//         <div className="pipeline-flow">
//           <span>Frontend form</span>
//           <span className="arrow">→</span>
//           <span>Backend API</span>
//           <span className="arrow">→</span>
//           <span>ML service</span>
//           <span className="arrow">→</span>
//           <span>Preprocessing + Random Forest</span>
//           <span className="arrow">→</span>
//           <span>Predicted kg</span>
//         </div>
//       </div>

//       <div className="panel">
//         <div className="panel-header">
//           <h3>Model comparison</h3>
//         </div>
//         <table className="metrics-table">
//           <thead>
//             <tr>
//               <th>Model</th>
//               <th>MAE</th>
//               <th>RMSE</th>
//               <th>R² (Test)</th>
//               <th>R² (Train)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {METRICS.map((m) => (
//               <tr key={m.model} className={m.selected ? "selected-row" : ""}>
//                 <td>
//                   {m.model}
//                   {m.selected && <span className="pill">Selected</span>}
//                 </td>
//                 <td>{m.mae.toFixed(3)}</td>
//                 <td>{m.rmse.toFixed(3)}</td>
//                 <td>{m.r2Test.toFixed(3)}</td>
//                 <td>{m.r2Train.toFixed(3)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <p className="about-copy small">
//           Random Forest was selected for the highest test-set R² (0.92) and
//           lowest error, with a small train/test gap (0.066) indicating it
//           generalizes well rather than overfitting — unlike the Decision
//           Tree, which reached a perfect training R² of 1.0 but only 0.59 on
//           test data.
//         </p>
//       </div>

//       <div className="panel">
//         <div className="panel-header">
//           <h3>Input fields</h3>
//         </div>
//         <table className="metrics-table fields-table">
//           <tbody>
//             {FIELDS.map(([field, desc]) => (
//               <tr key={field}>
//                 <td className="mono">{field}</td>
//                 <td className="muted">{desc}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


const METRICS = [
  {
    model: "Random Forest",
    short: "RF",
    mae: 4.63,
    rmse: 6.384,
    r2Test: 0.92,
    r2Train: 0.986,
    selected: true,
  },
  {
    model: "Gradient Boosting",
    short: "GB",
    mae: 4.883,
    rmse: 8.483,
    r2Test: 0.86,
    r2Train: 0.983,
    selected: false,
  },
  {
    model: "Decision Tree",
    short: "DT",
    mae: 6.885,
    rmse: 14.491,
    r2Test: 0.59,
    r2Train: 1.0,
    selected: false,
  },
  {
    model: "Linear Regression",
    short: "LR",
    mae: 11.154,
    rmse: 17.261,
    r2Test: 0.418,
    r2Train: 0.481,
    selected: false,
  },
];

const FIELDS = [
  ["meals_served", "Number of meals served that day"],
  ["kitchen_staff", "Number of kitchen staff on duty"],
  ["temperature_C", "Ambient temperature (°C)"],
  ["humidity_percent", "Relative humidity (%)"],
  ["day_of_week", "0 = Monday … 6 = Sunday"],
  ["special_event", "1 if a special event occurred"],
  ["past_waste_kg", "Historical waste from a comparable day"],
  ["staff_experience", "beginner / intermediate / expert"],
  ["waste_category", "Primary category of food served"],
];

export default function ModelInfo() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="welcome-pill small-pill">
            <span className="sparkle">✦</span>
            Behind the prediction
          </div>

          <span className="page-eyebrow">
            MACHINE LEARNING ENGINE
          </span>

          <h1 className="page-title">
            How WasteWise <em>thinks.</em>
          </h1>

          <p className="page-subtitle">
            A transparent look at the data pipeline and model
            behind every prediction.
          </p>
        </div>
      </div>

      <section className="model-hero">
        <div className="model-hero-content">
          <div className="model-symbol">RF</div>

          <span className="panel-kicker">
            SELECTED MODEL
          </span>

          <h2>Random Forest Regression</h2>

          <p>
            WasteWise uses a Random Forest regression model to
            estimate expected cafeteria food waste from
            operational, environmental and historical inputs.
          </p>

          <div className="model-stat-row">
            <div>
              <strong>0.920</strong>
              <span>Test R²</span>
            </div>

            <div>
              <strong>4.630</strong>
              <span>MAE</span>
            </div>

            <div>
              <strong>6.384</strong>
              <span>RMSE</span>
            </div>
          </div>
        </div>

        <div className="model-decoration">
          <div className="tree-node node-a">DATA</div>
          <div className="tree-node node-b">FEATURES</div>
          <div className="tree-node node-c">MODEL</div>
          <div className="tree-line line-a" />
          <div className="tree-line line-b" />
          <div className="tree-line line-c" />
        </div>
      </section>

      <div className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">PIPELINE</span>
            <h3>From input to prediction</h3>
          </div>
        </div>

        <p className="about-copy">
          Raw service data is cleaned, standardized and
          transformed before being passed to the trained model.
          The frontend sends raw fields while the saved ML
          pipeline handles preprocessing internally.
        </p>

        <div className="pipeline-modern">
          <div className="pipeline-step">
            <span>01</span>
            <strong>Input</strong>
            <small>Service data</small>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-step">
            <span>02</span>
            <strong>Prepare</strong>
            <small>Clean & encode</small>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-step">
            <span>03</span>
            <strong>Predict</strong>
            <small>Random Forest</small>
          </div>

          <div className="pipeline-connector">→</div>

          <div className="pipeline-step final">
            <span>04</span>
            <strong>Result</strong>
            <small>Expected kg</small>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">EVALUATION</span>
            <h3>Model comparison</h3>
          </div>

          <span className="accuracy-note">
            Test-set performance
          </span>
        </div>

        <div className="metrics-grid">
          {METRICS.map((metric) => (
            <div
              key={metric.model}
              className={`metric-card ${
                metric.selected ? "selected" : ""
              }`}
            >
              <div className="metric-card-top">
                <div className="metric-model-icon">
                  {metric.short}
                </div>

                {metric.selected && (
                  <span className="selected-pill">
                    Selected
                  </span>
                )}
              </div>

              <h4>{metric.model}</h4>

              <div className="metric-main">
                <strong>
                  {metric.r2Test.toFixed(3)}
                </strong>
                <span>Test R²</span>
              </div>

              <div className="metric-mini-row">
                <span>
                  MAE <b>{metric.mae.toFixed(3)}</b>
                </span>

                <span>
                  RMSE <b>{metric.rmse.toFixed(3)}</b>
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="about-copy small">
          Random Forest achieved the highest test-set R²
          (0.92) among the evaluated models and the lowest
          overall error in the comparison.
        </p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div>
            <span className="panel-kicker">DATA CONTRACT</span>
            <h3>Prediction input fields</h3>
          </div>
        </div>

        <div className="fields-grid">
          {FIELDS.map(([field, description], index) => (
            <div className="field-info-card" key={field}>
              <span>0{index + 1}</span>

              <div>
                <strong>{field}</strong>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}