import React, { useEffect, useRef, useState } from "react";
import socket from "../Socket";
import EmojiPicker from "emoji-picker-react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useLocation } from "react-router-dom";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [file, setFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [preview, setPreview] = useState(null);

  const messagesEndRef = useRef(null);
  const dropRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const sender = user?.name || "Anonymous";

  // ✅ Reload only once per session on first entry to /chat
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("chatReloaded");
    if (!hasReloaded && location.pathname === "/chat") {
      sessionStorage.setItem("chatReloaded", "true");
      window.location.reload();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const handleHistory = (data) => {
      setMessages(data);
      setTimeout(() => scrollToBottom(false), 200);
    };

    const handleReceive = (msg) => {
      setMessages((prev) => [...prev, msg]);
      setTimeout(() => scrollToBottom(true), 100);
    };

    socket.on("chatHistory", handleHistory);
    socket.on("receiveMessage", handleReceive);
    socket.on("typing", setTypingUser);
    socket.on("stopTyping", () => setTypingUser(""));
    socket.on("onlineUsers", setOnlineUsers);

    return () => {
      socket.off("chatHistory", handleHistory);
      socket.off("receiveMessage", handleReceive);
      socket.off("typing", setTypingUser);
      socket.off("stopTyping");
      socket.off("onlineUsers", setOnlineUsers);
    };
  }, [navigate, user]);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "auto",
    });
  };

  const handleTyping = (e) => {
    setText(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", sender);
    }
    setTimeout(() => {
      setTyping(false);
      socket.emit("stopTyping");
    }, 1000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const sendMessage = () => {
    if (!text.trim() && !file) return;

    const msgData = {
      sender,
      message: text,
      timestamp: new Date().toISOString(),
      image: null,
    };

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        msgData.image = reader.result;
        socket.emit("sendMessage", msgData);
      };
      reader.readAsDataURL(file);
    } else {
      socket.emit("sendMessage", msgData);
    }

    setText("");
    setFile(null);
    setPreview(null);
    setShowEmoji(false);
  };

  const onEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleDelete = (id) => {
    socket.emit("deleteMessage", id);
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-black">
      {/* ✅ Sticky Header */}
      <div className="py-4 px-6 bg-white shadow-md sticky top-0 z-50 flex justify-between items-center border-b">
        <h1 className="text-2xl font-semibold text-blue-600">💬 HackToon Chat</h1>
        <span className="text-sm text-gray-500">🔵 Online: {onlineUsers}</span>
      </div>

      <div
        className="flex-1 overflow-y-auto px-4 py-3"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        ref={dropRef}
      >
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`group relative p-3 rounded-xl max-w-[80%] shadow-sm transition-all ${
                msg.sender === sender
                  ? "ml-auto bg-blue-100 text-right"
                  : "mr-auto bg-white text-left"
              }`}
            >
              <div className="text-xs text-gray-500 mb-1 font-semibold">
                {msg.sender}
              </div>
              <div className="text-sm break-words whitespace-pre-wrap">
                <ReactMarkdown>{msg.message}</ReactMarkdown>
              </div>
              {msg.image && (
                <img
                  src={msg.image}
                  alt="shared"
                  className="rounded-lg mt-2 border max-w-full max-h-64 object-contain"
                />
              )}
              <div
                className="text-[10px] text-gray-400 mt-1"
                title={new Date(msg.timestamp).toLocaleString()}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} ✅✅
              </div>
              {msg.sender === sender && (
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="absolute top-1 right-1 hidden group-hover:block text-xs text-red-400 hover:text-red-600"
                >
                  🗑️
                </button>
              )}
            </div>
          ))}
          {typingUser && (
            <div className="text-sm text-gray-400 italic px-2">
              {typingUser} is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ✅ Input Section */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-2">
        <div className="max-w-2xl mx-auto flex items-center space-x-2 relative">
          <label className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600 hover:text-blue-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 9.4L10.8 15a3.2 3.2 0 01-4.5-4.5l6.2-6.2a4.5 4.5 0 116.4 6.4L11 18a6 6 0 01-8.5-8.5l5.5-5.5"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="hidden"
            />
          </label>

          <button
            onClick={() => setShowEmoji(!showEmoji)}
            className="text-xl px-1 hover:text-yellow-500"
          >
            😊
          </button>

          <input
            type="text"
            value={text}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black bg-white"
            placeholder="Type your message..."
          />

          <button
            onClick={sendMessage}
            className="text-blue-600 hover:text-blue-800"
            title="Send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 20v-6l16-4-16-4v-6l20 10-20 10z" />
            </svg>
          </button>

          {showEmoji && (
            <div className="absolute bottom-14 left-0 z-50">
              <EmojiPicker onEmojiClick={onEmojiClick} disableSearchBar />
            </div>
          )}
        </div>

        {preview && (
          <div className="max-w-2xl mx-auto mt-2">
            <div className="text-xs text-gray-500 mb-1">Image preview:</div>
            <img
              src={preview}
              alt="preview"
              className="rounded w-28 h-28 object-cover border"
            />
          </div>
        )}
      </div>
    </div>
  );
}
