import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Send from "@mui/icons-material/Send";
import openai from "../../openai";
import dataset from "../dataset";
import Message from "../components/Message";

const SYSTEM = {
  role: "system",
  content: `You are a highly intelligent question answering bot. If i ask you a question that is nonsense, trickery, or has no clear answer, you will respond with "I don't understand". Try to respond to the questions in the same language`,
};

export const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([SYSTEM]);
  const [isLoading, setIsloading] = useState(false);

  const addUserMessage = async () => {
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    setIsloading(true);

    // setTimeout(() => {
    //   setMessages((prev) => [...prev, { role: "assistant", content: "hola" }]);
    //   setIsloading(false);
    // }, 2000);
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messages, { role: "user", content: input }],
    });
    const answer = chatCompletion.data.choices[0].message;
    const message = { role: "assistant", content: answer.content || "Lo siento hubo un error" };
    setMessages((prev) => [...prev, message]);

    setIsloading(false);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        //  sx={{ height: "calc(100vh - 112px)" }}
      >
        <Grid container item xs={12}>
          {messages
            .filter((x) => x.role === "user" || x.role === "assistant")
            .map((message, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sx={{
                  justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                  display: "flex",
                }}
              >
                <Message role={message.role}>{message.content}</Message>
              </Grid>
            ))}

          {/* {isLoading && (
            <Grid item xs={12} sx={{ justifyContent: "flex-start", display: "flex" }}>
              <Message role="assistant">Cargando...</Message>
            </Grid>
          )} */}
        </Grid>

        <Grid
          container
          item
          xs={12}
          alignSelf={"flex-end"}
          style={{
            position: "sticky",
            bottom: 0,
            paddingTop: 10,
            padding: 5,
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              addUserMessage();
            }}
          >
            <TextField
              fullWidth
              size="medium"
              value={input}
              onChange={handleInputChange}
              variant="standard"
            />
            <IconButton
              disabled={!(input.length > 0) || isLoading}
              type="submit"
              style={{ marginLeft: 10 }}
            >
              <Send />
            </IconButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
