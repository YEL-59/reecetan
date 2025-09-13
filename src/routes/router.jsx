import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import { ProtectedRoute, GuestRoute } from "@/components/auth/AuthGuard";
import Login from "@/pages/auth/signin";
import Register from "@/pages/auth/signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyCourses from "@/pages/dashboard/my-courses";
import CourseDetails from "@/pages/dashboard/my-courses/components/CourseDetails";
import CourseOutline from "@/pages/dashboard/my-courses/components/CourseOutline";
import Lesson from "@/pages/dashboard/my-courses/components/Lesson";
import Quiz from "@/pages/dashboard/my-courses/components/Quiz";
import QuizAnalysis from "@/pages/dashboard/quiz-analysis";
import Certificates from "@/pages/dashboard/certificates";
import Home from "@/pages/main/home";
import AboutUs from "@/pages/main/aboutus";
import ContactUs from "@/pages/main/contactus";
import NotFound from "@/pages/404";
import Courses from "@/pages/main/courses";
import CartPage from "@/pages/main/cart";
import CheckoutPage from "@/pages/CheckoutPage";
import CheckoutSuccess from "@/pages/main/checkout/success";
import Testimonial from "@/pages/main/testimonial";
import MyAccount from "@/pages/main/myaccount";
import ForgetPassword from "@/pages/auth/forget-password";
import ForgetPasswordOtp from "@/pages/auth/forget-password-otp";
import ResetPassword from "@/pages/auth/reset-password";
import EmailVerification from "@/pages/auth/email-verifi";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [


      { index: true, element: <Home /> },
      { path: "aboutus", element: <AboutUs /> },
      { path: "contactus", element: <ContactUs /> },
      { path: "courses", element: <Courses /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "checkout/success", element: <CheckoutSuccess /> },
      { path: "testimonial", element: <Testimonial /> },
      { path: "myaccount", element: <MyAccount /> }



    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <GuestRoute><Login /></GuestRoute> },
      { path: "register", element: <GuestRoute><Register /></GuestRoute> },
      { path: "forget-password", element: <GuestRoute><ForgetPassword /></GuestRoute> },
      { path: "forget-password-otp", element: <GuestRoute><ForgetPasswordOtp /></GuestRoute> },
      { path: "reset-password", element: <GuestRoute><ResetPassword /></GuestRoute> },
      { path: "email-verification", element: <GuestRoute><EmailVerification /></GuestRoute> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "my-courses", element: <MyCourses /> },
      { path: "my-courses/:courseId", element: <CourseDetails /> },
      { path: "my-courses/:courseId/outline", element: <CourseOutline /> },
      { path: "my-courses/:courseId/lesson/:lessonId/topic/:topicId", element: <Lesson /> },
      { path: "my-courses/:courseId/quiz/:quizId", element: <Quiz /> },
      { path: "quiz-analytics", element: <QuizAnalysis /> },
      { path: "analytics", element: <div>Analytics Page</div> },
      { path: "certifications", element: <Certificates /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
