import React, { useState, useEffect } from "react";
import * as c3 from "c3";
import "c3/c3.css";
import "./AISuggestion.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello! I'm your AdIntel AI assistant. How can I help you analyze your advertising data today?",
    },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Generate Chart
    c3.generate({
      bindto: "#performanceTrendChart",
      data: {
        columns: [
          ["Engagement", 30, 45, 52, 40, 48, 55, 62],
          ["Reach", 20, 30, 35, 38, 42, 45, 50],
        ],
        types: {
          Engagement: "area-spline",
          Reach: "spline",
        },
      },
      color: {
        pattern: ["#0081c6", "#34D399"],
      },
      axis: {
        x: {
          type: "category",
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
      },
      point: {
        show: false,
      },
    });
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: input },
      {
        type: "ai",
        text: "Here's your performance trend for the last week:",
      },
    ]);
    setInput("");
  };

  return (
    <section id="chatbot_interface" className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">AI Assistant</h2>
          <p className="text-gray-600 mt-2">
            Get instant answers about your advertising insights
          </p>
        </div>

        <div className="chat-container">
          <div className="chat-header">
            <div className="header-icon">
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">AdIntel AI</h3>
              <span className="text-sm text-green-500">Online</span>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${
                  message.type === "ai" ? "ai-message" : "user-message"
                }`}
              >
                <div
                  className={`message-bubble ${
                    message.type === "ai" ? "ai-bubble" : "user-bubble"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}

            <div id="performanceTrendChart" className="chart-container"></div>
          </div>

          <div className="chat-input">
            <form onSubmit={handleSend} className="input-form">
              <input
                type="text"
                className="input-box"
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="send-button">
                <span>Send</span>
                <svg
                  className="send-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="suggested-questions">
          <h4 className="text-sm font-semibold text-gray-600 mb-3">
            Suggested Questions
          </h4>
          <div className="questions-list">
            <button className="question">Show me top performing ads</button>
            <button className="question">Analyze audience engagement</button>
            <button className="question">Compare campaign metrics</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
