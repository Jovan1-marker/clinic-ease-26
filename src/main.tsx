import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RealtimeProvider } from "./hooks/useRealtime";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <RealtimeProvider />     {/* ← This activates realtime for the whole app */}
  </>
);
