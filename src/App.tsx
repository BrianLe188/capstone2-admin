import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/app";
import Modules from "./pages/modules";
import SubjectBlock from "./pages/subjectBlock";
import MemberSchool from "@/pages/memberSchool";
import Subject from "./pages/subject";
import User from "@/pages/user";
import Majors from "./pages/majors";

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
        {
          path: "subject-block",
          element: <SubjectBlock />,
        },
        {
          path: "member-school",
          element: <MemberSchool />,
        },
        {
          path: "subject",
          element: <Subject />,
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "majors",
          element: <Majors />,
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
