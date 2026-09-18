import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "wastewise_forecast_history";

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function useForecastHistory() {
  const [history, setHistory] = useState(loadHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // storage full or unavailable - fail silently, history just won't persist
    }
  }, [history]);

  const addEntry = useCallback((input, predictedKg) => {
    setHistory((prev) => [
      {
        id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
        timestamp: new Date().toISOString(),
        input,
        predictedKg,
      },
      ...prev,
    ].slice(0, 100)); // keep it bounded
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  return { history, addEntry, clearHistory };
}
