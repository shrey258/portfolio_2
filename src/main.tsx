import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// The old /experience page now lives on the home page.
if (location.pathname === "/experience") {
  history.replaceState(null, "", "/#work");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
