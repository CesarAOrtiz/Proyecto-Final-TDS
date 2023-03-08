import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

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
