// import { useEffect, useState } from "react";
// import Dashboard from "./Dashboard.jsx";
// import NewForecast from "./NewForecast.jsx";
// import History from "./History.jsx";
// import ModelInfo from "./ModelInfo.jsx";
// import useForecastHistory from "./useForecastHistory.js";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// const NAV_ITEMS = [
//   { key: "dashboard", label: "Dashboard" },
//   { key: "forecast", label: "New forecast" },
//   { key: "history", label: "History" },
//   { key: "model", label: "Model info" },
// ];

// export default function App() {
//   const [page, setPage] = useState("dashboard");
//   const [backendHealth, setBackendHealth] = useState("checking");
//   const { history, addEntry, clearHistory } = useForecastHistory();

//   useEffect(() => {
//     let cancelled = false;

//     async function checkHealth() {
//       try {
//         const res = await fetch(`${BACKEND_URL}/health`);
//         if (!cancelled) setBackendHealth(res.ok ? "ok" : "down");
//       } catch {
//         if (!cancelled) setBackendHealth("down");
//       }
//     }

//     checkHealth();
//     const interval = setInterval(checkHealth, 15000);
//     return () => {
//       cancelled = true;
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div className="app-shell">
//       <aside className="sidebar">
//         <div className="brand">
//           <span className="brand-mark">WW</span>
//           <div>
//             <p className="brand-name">WasteWise AI</p>
//             <p className="brand-sub">Cafeteria forecasting</p>
//           </div>
//         </div>

//         <nav className="side-nav">
//           {NAV_ITEMS.map((item) => (
//             <button
//               key={item.key}
//               className={`side-nav-item ${page === item.key ? "active" : ""}`}
//               onClick={() => setPage(item.key)}
//             >
//               {item.label}
//             </button>
//           ))}
//         </nav>

//         <div className="sidebar-footer">
//           <span className="status-chip">
//             <span
//               className={`status-dot ${
//                 backendHealth === "ok" ? "ok" : backendHealth === "down" ? "down" : ""
//               }`}
//             />
//             {backendHealth === "checking" && "Checking backend…"}
//             {backendHealth === "ok" && "Backend connected"}
//             {backendHealth === "down" && "Backend unreachable"}
//           </span>
//         </div>
//       </aside>

//       <main className="main-content">
//         {page === "dashboard" && (
//           <Dashboard history={history} backendHealth={backendHealth} onNavigate={setPage} />
//         )}
//         {page === "forecast" && (
//           <NewForecast onForecastComplete={(input, predictedKg) => addEntry(input, predictedKg)} />
//         )}
//         {page === "history" && (
//           <History history={history} onClear={clearHistory} onNavigate={setPage} />
//         )}
//         {page === "model" && <ModelInfo />}
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import Dashboard from "./Dashboard.jsx";
import NewForecast from "./NewForecast.jsx";
import History from "./History.jsx";
import ModelInfo from "./ModelInfo.jsx";
import useForecastHistory from "./useForecastHistory.js";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "grid" },
  { key: "forecast", label: "New forecast", icon: "spark" },
  { key: "history", label: "History", icon: "clock" },
  { key: "model", label: "Model info", icon: "brain" },
];

function LogoMark() {
  return (
    <div className="logo-mark" aria-label="WasteWise AI">
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M37.5 9.5C25.5 9.5 13 16.2 13 28.4c0 6.2 4.8 10.1 10.7 10.1 10.8 0 15.8-10.8 13.8-29Z"
          fill="currentColor"
        />
        <path
          d="M12 36.5c5.4-8.5 12.4-14.1 22.5-19.2"
          stroke="white"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function NavIcon({ type }) {
  if (type === "grid") {
    return (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l1.5 6.5L20 12l-6.5 1.5L12 20l-1.5-6.5L4 12l6.5-2.5L12 3Z" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24">
      <path d="M9.5 4h5l1.5 3 3 1.5v5L16 15l-1.5 3h-5L8 15l-3-1.5v-5L8 7l1.5-3Z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [backendHealth, setBackendHealth] = useState("checking");
  const { history, addEntry, clearHistory } = useForecastHistory();

  useEffect(() => {
    let cancelled = false;

    async function checkHealth() {
      try {
        const res = await fetch(`${BACKEND_URL}/health`);

        if (!cancelled) {
          setBackendHealth(res.ok ? "ok" : "down");
        }
      } catch {
        if (!cancelled) {
          setBackendHealth("down");
        }
      }
    }

    checkHealth();

    const interval = setInterval(checkHealth, 15000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const pageTitle = {
    dashboard: "Dashboard",
    forecast: "New forecast",
    history: "Forecast history",
    model: "Model information",
  }[page];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <LogoMark />

          <div className="brand-copy">
            <p className="brand-name">WasteWise</p>
            <span>AI</span>
            <p className="brand-sub">Smart waste intelligence</p>
          </div>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <nav className="side-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`side-nav-item ${
                page === item.key ? "active" : ""
              }`}
              onClick={() => setPage(item.key)}
            >
              <span className="nav-icon">
                <NavIcon type={item.icon} />
              </span>

              <span>{item.label}</span>

              {page === item.key && <span className="nav-active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="eco-card">
            <div className="eco-icon">♻</div>
            <div>
              <strong>Waste less.</strong>
              <span>Plan smarter.</span>
            </div>
          </div>

          <div className="connection-card">
            <div
              className={`connection-dot ${
                backendHealth === "ok"
                  ? "online"
                  : backendHealth === "down"
                  ? "offline"
                  : "checking"
              }`}
            />

            <div>
              <span className="connection-title">
                {backendHealth === "ok"
                  ? "System online"
                  : backendHealth === "down"
                  ? "System offline"
                  : "Connecting..."}
              </span>

              <span className="connection-sub">
                {backendHealth === "ok"
                  ? "AI services connected"
                  : "Checking services"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="mobile-header">
          <div className="mobile-brand">
            <LogoMark />
            <strong>WasteWise <span>AI</span></strong>
          </div>

          <div
            className={`mobile-status ${
              backendHealth === "ok" ? "online" : ""
            }`}
          />
        </header>

        <div className="mobile-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={page === item.key ? "active" : ""}
              onClick={() => setPage(item.key)}
            >
              <NavIcon type={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="content-topbar">
          <div>
            <span className="breadcrumb">WasteWise AI / {pageTitle}</span>
          </div>

          <div className="topbar-status">
            <span
              className={`topbar-dot ${
                backendHealth === "ok"
                  ? "online"
                  : backendHealth === "down"
                  ? "offline"
                  : ""
              }`}
            />
            {backendHealth === "ok"
              ? "AI system connected"
              : backendHealth === "down"
              ? "Connection unavailable"
              : "Checking connection"}
          </div>
        </div>

        <div className="page-transition" key={page}>
          {page === "dashboard" && (
            <Dashboard
              history={history}
              backendHealth={backendHealth}
              onNavigate={setPage}
            />
          )}

          {page === "forecast" && (
            <NewForecast
              onForecastComplete={(input, predictedKg) =>
                addEntry(input, predictedKg)
              }
            />
          )}

          {page === "history" && (
            <History
              history={history}
              onClear={clearHistory}
              onNavigate={setPage}
            />
          )}

          {page === "model" && <ModelInfo />}
        </div>
      </main>
    </div>
  );
}