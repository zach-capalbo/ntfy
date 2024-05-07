import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import registerSW from "./registerSW";
import '@alenaksu/json-viewer';

registerSW();

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
