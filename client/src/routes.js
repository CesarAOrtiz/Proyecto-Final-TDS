import { Navigate, useRoutes } from "react-router-dom";
import authRoutes from "./auth/routes";
import mainRoutes from "./layouts/routes";
import twitterRoutes from "./twitter/routes";
import textRoutes from "./text/routes";
import foldersRoutes from "./folders/routes";
import usersRoutes from "./users/routes";

export const routes = [
  authRoutes,
  mainRoutes,
  twitterRoutes,
  textRoutes,
  foldersRoutes,
  usersRoutes,
  {
    path: "*",
    element: <Navigate to="/auth/404" replace />,
  },
];

export function getRoutes(path) {
  return routes.find((route) => route.path === path);
}

export default function Router() {
  return useRoutes(routes);
}
