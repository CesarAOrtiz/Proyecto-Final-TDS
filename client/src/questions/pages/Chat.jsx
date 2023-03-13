import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Send from "@mui/icons-material/Send";
// import openai from "../../openai";
import dataset from "../dataset";
import Message from "../components/Message";

// const completion = await openai.createChatCompletion({
//   model: "gpt-3.5-turbo",
//   // replace prompt with messages and set prompt as content with a role.
//   messages: [
//     { "role": "system", "content": "You are a helpful assistant." },
//     { "role": "user", "content": "Who won the world series in 2020?" },
//     { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
//     { "role": "user", "content": "Where was it played?" },
//   ],
// });

const SYSTEM = {
  role: "system",
  content: `You are a highly intelligent question answering bot. I ask you a question that is rooted in truth, I will give you the answer. If i ask you a question that is nonsense, trickery, or has no clear answer, you will respond with "I don't understand" or if i ask you in spanish respond "Lo siento no entendí".`,
};

export const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(dataset);
  const [data, setData] = React.useState(messages.concat(messages).concat(messages));
  const [loading, setloading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (input) {
      setMessages([...messages, { role: "user", content: input }]);
      setInput("");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid container item xs={12}>
          {data.map((message, index) => (
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
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            backgroundColor: "white",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextField
              fullWidth
              value={input}
              onChange={handleInputChange}
              variant="outlined"
              label="Escribe tu mensaje"
            />

            <IconButton onClick={handleSendMessage} style={{ marginLeft: 10 }}>
              <Send />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
