import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PrimeReactProvider } from "primereact/api";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import GlobalContextProvider from "./contexts/globalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
