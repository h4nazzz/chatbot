import React from "react";
import {useState} from "react";
import "./App.css";
 
function App(){
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");
  let chatbotResponses = "";
  function sendMessage() {

  let chatbotResponses = "";

  if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hi") || input.toLowerCase().includes("hey")) {
    chatbotResponses = "Hello!";
  }
  else if (input.toLowerCase().includes("how are you")) {
    chatbotResponses = "I'm good, thank you!";
  }
  else if (input.toLowerCase().includes("your name")) {
    chatbotResponses = "I'm a chatbot!";
  } 
  else if (input.toLowerCase().includes("dice")) {
    chatbotResponses = "You rolled a " + Math.floor(Math.random() * 6) + "!";
  }
  else if (input.toLowerCase().includes("joke")) {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why did the scarecrow win an award? Because he was outstanding in his field!",
      "Why did the bicycle fall over? Because it was two-tired!"  
    ];
    chatbotResponses = jokes[Math.floor(Math.random() * jokes.length)];
  }
  else if (input.toLowerCase().includes("weather")) {
    chatbotResponses = "I can't check the weather right now, but I hope it's nice outside!";
  }
  else if (input.toLowerCase().includes("time")) {
    const currentTime = new Date().toLocaleTimeString();
    chatbotResponses = "The current time is " + currentTime;
  }
  else if (input.toLowerCase().includes("date")) {
    const currentDate = new Date().toLocaleDateString();
    chatbotResponses = "Today's date is " + currentDate;
  }   
  else if (input.toLowerCase().includes("bye") || input.toLowerCase().includes("goodbye")) {
    chatbotResponses = "Goodbye!";
  }
  else if (input.toLowerCase().includes("thank you") || input.toLowerCase().includes("thanks")) {
    chatbotResponses = "You're welcome!";
  }
  else if (input.toLowerCase().includes("odd or even")) {
    const number = parseInt(input.split(" ")[0]);
    if (!isNaN(number)) {
      chatbotResponses = number % 2 === 0 ? "It's even!" : "It's odd!";
    } else {
      chatbotResponses = "Please enter a valid number.";
    }
  }
  else {
    chatbotResponses = "I don't understand";
  }

  setMessage([
  ...message,

  {
    text: input,
    sender: "user"
  },

  {
    text: chatbotResponses,
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