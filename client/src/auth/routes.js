import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { Login, NotFound, ForgotPassword } from "./pages";

export const routes = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "", element: <Navigate to="/auth/login" replace /> },
    { path: "login", element: <Login /> },
    { path: "forgotpassword", element: <ForgotPassword /> },
    { path: "404", element: <NotFound /> },
  ],
};

export default routes;
