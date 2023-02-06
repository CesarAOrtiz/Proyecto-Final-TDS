import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Search } from "./pages";

const routes = {
  path: "/facebook",
  element: <AuthRouth component={() => <MainLayout path={"/facebook"} />} />,
  children: [
    {
      path: "",
      element: <Search />,
    },
  ],
};

export default routes;
