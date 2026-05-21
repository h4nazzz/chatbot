import React from "react";
import {useState} from "react";
import "./App.css";
 
function App(){
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  async function sendMessage() {
    console.log(import.meta.env.VITE_CHATBOT_API_KEY);
    const userMessage = {
  text: input,
  sender: "user"
};
setMessage((prev) => [
  ...prev,
  userMessage
]);

const response = await fetch(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",

     "Authorization":
      "Bearer " + import.meta.env.VITE_CHATBOT_API_KEY ,
    },

    body: JSON.stringify({

      model: "openrouter/free",

      messages: [
        {
          role: "user",
          content: input
        }
      ]

    })
  }
);

  const botMessage = await response.json();

if (!response.ok) {

  console.log(botMessage);

  setMessage((prev) => [
    ...prev,
    {
      text: "API Error",
      sender: "bot"
    }
  ]);

  return;
}
  console.log(botMessage);
  setMessage((prev) => [
    ...prev,
    {
      text: botMessage.choices[0].message.content,
      sender: "bot"
    }
  ]);

  setInput("");
}

  return (
    <div>
      <div id="chat-container">
  {message.map((msg, index) => (
    <p
      key={index}
      className={msg.sender}
    >
      {msg.sender === "user"
        ? "You: "
        : "Chatbot: "}
      {msg.text}
    </p>
  ))}
</div>
      <div id="bottom"  >
        <input  onKeyDown={(e)=> e.key=== "Enter" && sendMessage()} type="text" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button id="send" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default App;