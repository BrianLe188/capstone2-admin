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
import File from "./pages/manageFiles";
import Dashboard from "./pages/dashboard";
import SubMajors from "./pages/sub-majors";
import Application from "./pages/application";
import Rules from "./pages/rules";
import Certificate from "./pages/certificates";
import Conversation from "./pages/conversations";

function App() {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
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
        {
          path: "sub-majors",
          element: <SubMajors />,
        },
        {
          path: "file",
          element: <File />,
        },
        {
          path: "application",
          element: <Application />,
        },
        {
          path: "rules",
          element: <Rules />,
        },
        {
          path: "certificates",
          element: <Certificate />,
        },
        {
          path: "conversations",
          element: <Conversation />,
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
