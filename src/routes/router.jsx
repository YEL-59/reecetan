import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import Home from "@/pages/main/home";
import AboutUs from "@/pages/main/aboutus";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ index: true, element: <Home /> },
      { path: "aboutus", element: <AboutUs /> }],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "recipes", element: <div>Recipes Page</div> },
      { path: "collections", element: <div>Collections Page</div> },
      { path: "analytics", element: <div>Analytics Page</div> },
      { path: "users", element: <div>Users Page</div> },
      { path: "content", element: <div>Content Page</div> },
      { path: "messages", element: <div>Messages Page</div> },
      { path: "settings", element: <div>Settings Page</div> },
    ],
  },
]);
