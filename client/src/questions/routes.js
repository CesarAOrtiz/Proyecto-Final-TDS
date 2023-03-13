import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Chat } from "./pages";

const questionsSystem = {
  role: "system",
  content: `You are a highly intelligent question answering bot. If i ask you a question that is nonsense, trickery, or has no clear answer, you will respond with "I don't understand". Try to respond to the questions in the same language`,
};

const routes = {
  path: "/questions",
  element: <AuthRouth component={() => <MainLayout path={"/twitter"} />} />,
  children: [
    {
      path: "",
      element: <Chat system={questionsSystem} />,
    },
  ],
};

export default routes;
