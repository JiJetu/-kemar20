import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/home/Home";
import Profile from "../page/profile/Profile";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";
import ForgotPassword from "../page/auth/ForgotPassword";
import ExamDetails from "../page/examDetails/ExamDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "exam-details/:id",
        element: <ExamDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

export default router;
