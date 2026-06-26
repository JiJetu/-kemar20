import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../page/ErrorPage";
import Home from "../page/home/Home";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";
import ForgotPassword from "../page/auth/ForgotPassword";
import StudentDashboard from "../page/dashboard/student/StudentDashboard";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../page/dashboard/admin/AdminDashboard";
import StudentManagement from "../page/dashboard/admin/StudentManagement";
import Profile from "../components/studentDashboard/profile/Profile";
import ExamDetails from "../page/dashboard/student/examDetails/ExamDetails";
import StudentProfile from "../components/admin/student/StudentProfile";
import UploadQuizPdf from "../page/dashboard/admin/UploadQuizPdf";
import QuizManagement from "../page/dashboard/admin/QuizManagement";
import QuizDetail from "../page/dashboard/admin/QuizDetail";
import SettingsPage from "../page/dashboard/admin/SettingsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <StudentDashboard />,
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
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "student",
        element: <StudentManagement />,
      },
      {
        path: "student/:id",
        element: <StudentProfile />,
      },
      {
        path: "upload-quiz",
        element: <UploadQuizPdf />,
      },
      {
        path: "quiz",
        element: <QuizManagement />,
      },
      {
        path: "quiz/:id",
        element: <QuizDetail />,
      },
      {
        path: "setting",
        element: <SettingsPage />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

export default router;
