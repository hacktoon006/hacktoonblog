import React, { useState } from "react";
import axios from "axios";

export default function HackBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendToBot = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", message: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/api/hackbot/ask", { prompt: input });
      const botMessage = { sender: "@HackBot", message: res.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { sender: "@HackBot", message: "❌ Error getting response." };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">🤖 @HackBot</h1>
        <div className="space-y-2 max-h-[60vh] overflow-y-auto border p-3 rounded">
          {messages.map((msg, idx) => (
            <div key={idx} className={`text-sm ${msg.sender === "@HackBot" ? "text-gray-700" : "text-right text-blue-600"}`}>
              <strong>{msg.sender}: </strong>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Ask something like 'how to scan ports?'"
            onKeyDown={(e) => e.key === "Enter" && sendToBot()}
          />
          <button onClick={sendToBot} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
