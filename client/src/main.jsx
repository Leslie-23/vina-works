import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      {/* <BrowserRouter> */}
      <App />
      <ToastContainer />
      {/* </BrowserRouter> */}
    </LoadingProvider>
  </StrictMode>
);
