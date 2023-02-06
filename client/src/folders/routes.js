import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";

const routes = {
  path: "/home",
  element: <AuthRouth component={() => <MainLayout path={"/home"} />} />,
  children: [
    {
      path: "",
      element: (
        <>
          <div>Home</div>
        </>
      ),
    },
  ],
};

export default routes;
