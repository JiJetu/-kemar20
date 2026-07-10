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
import ManageSubscription from "../components/studentDashboard/profile/ManageSubscription";
import ExamDetails from "../page/dashboard/student/examDetails/ExamDetails";
import PaymentSuccess from "../page/dashboard/student/PaymentSuccess";
import StudentProfile from "../components/admin/student/StudentProfile";
import UploadQuizPdf from "../page/dashboard/admin/UploadQuizPdf";
import QuizManagement from "../page/dashboard/admin/QuizManagement";
import QuizDetail from "../page/dashboard/admin/QuizDetail";
import SettingsPage from "../page/dashboard/admin/SettingsPage";
import SubscriptionManagement from "../page/dashboard/admin/SubscriptionManagement";
import ProtectedRoute from "../components/shared/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/test",
  //   element: <PricingPlanScreen />,
  // },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <MainLayout />
      </ProtectedRoute>
    ),
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
        path: "manage-subscription",
        element: <ManageSubscription />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
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
        path: "subscriptions",
        element: <SubscriptionManagement />,
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

