import React from "react";
import ReactDOM from "react-dom/client";

// self-hosted variable fonts (latin subset) — no render-blocking Google Fonts
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono/wght.css";

import "./i18n";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
