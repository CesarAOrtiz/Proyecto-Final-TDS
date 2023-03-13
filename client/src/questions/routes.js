import AuthRouth from "../auth/AuthRouth";
import MainLayout from "../layouts/MainLayout";
import { Chat } from "./pages";

const Questions = () => (
  <Chat
    setup={{
      role: "system",
      content: `You are a highly intelligent question answering bot. If i ask you a question that is nonsense, trickery, or has no clear answer, you will respond with "I don't understand". Try to respond to the questions in the same language`,
      infoMessage: `Soy un bot de respuesta a preguntas muy inteligente. Si me haces una pregunta con
una respuesta concreta, te daré la respuesta. Si me haces una pregunta que es una
tontería, un engaño o no tiene una respuesta clara, no podré responderte.
`,
    }}
  />
);

const Translations = () => (
  <Chat
    setup={{
      role: "system",
      content: `You are a helpful and highly intelligent translation bot that translates English to Spanish and Spanish to English.`,
      infoMessage: `Soy un bot de traducción muy inteligente y útil que traduce el inglés al español y el español al inglés.`,
    }}
  />
);

const ChatLikeGPT3 = () => (
  <Chat
    setup={{
      role: "system",
      content:
        "You are a friendly and intelligent chat assistant who can answer questions and interact in a friendly way.",
      infoMessage: `Soy un asistente de chat amigable e inteligente que puede responder preguntas e interactuar de forma amigable.`,
    }}
  />
);

const routes = {
  path: "/chat",
  element: <AuthRouth component={() => <MainLayout path={"/chat"} />} />,
  children: [
    {
      path: "questions",
      element: <Questions />,
    },
    {
      path: "translate",
      element: <Translations />,
    },
    {
      path: "assistant",
      element: <ChatLikeGPT3 />,
    },
  ],
};

export default routes;
