import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GlobalContextProvider from "./contexts/globalContext.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { Provider } from "react-redux";
// import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
    {/* </Provider> */}
    <ToastContainer />
  </React.StrictMode>
);
