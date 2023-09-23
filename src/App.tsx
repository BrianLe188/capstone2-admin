import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/app";
import Modules from "./pages/modules";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <>Dashboard</>,
        },
        {
          path: "modules",
          element: <Modules />,
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
