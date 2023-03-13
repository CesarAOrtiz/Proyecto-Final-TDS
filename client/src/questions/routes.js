import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Chat } from "./pages";

const routes = {
  path: "/questions",
  element: <AuthRouth component={() => <MainLayout path={"/twitter"} />} />,
  children: [
    {
      path: "",
      element: <Chat />,
    },
  ],
};

export default routes;
