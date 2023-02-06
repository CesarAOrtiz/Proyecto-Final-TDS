import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Search } from "./pages";

const routes = {
  path: "/twitter",
  element: <AuthRouth component={() => <MainLayout path={"/twitter"} />} />,
  children: [
    {
      path: "",
      element: <Search />,
    },
  ],
};

export default routes;
