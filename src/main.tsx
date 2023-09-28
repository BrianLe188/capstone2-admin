import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalContextProvider from "./contexts/globalContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    <ToastContainer />
  </React.StrictMode>
);
