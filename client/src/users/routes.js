import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Users, Profile } from "./pages";

const routes = {
  path: "/users",
  element: <AuthRouth component={() => <MainLayout path={"/users"} />} />,
  children: [
    { path: "", element: <AuthRouth adminRequired component={() => <Users />} /> },
    { path: "profile", element: <Profile /> },
  ],
};

export default routes;
