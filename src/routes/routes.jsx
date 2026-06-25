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
        path: "upload-quiz-pdf",
        element: <UploadQuizPdf />,
      },
      {
        path: "quiz",
        element: <div className="text-left p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"><h2 className="text-xl font-bold text-slate-800 mb-2">Quiz Panel</h2><p className="text-slate-500">Quiz details and management coming soon.</p></div>,
      },
      {
        path: "setting",
        element: <div className="text-left p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"><h2 className="text-xl font-bold text-slate-800 mb-2">Settings</h2><p className="text-slate-500">Admin settings page coming soon.</p></div>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
]);

export default router;
