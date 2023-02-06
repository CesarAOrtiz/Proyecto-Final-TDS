import { Navigate } from "react-router-dom";
import AuthRouth from "../auth/AuthRouth";
import MainLayout from "./MainLayout";

const routes = {
  path: "/",
  element: <AuthRouth component={() => <MainLayout path={"/"} />} />,
  children: [
    {
      path: "",
      element: <Navigate to="/twitter" replace />,
    },
  ],
};

export default routes;
