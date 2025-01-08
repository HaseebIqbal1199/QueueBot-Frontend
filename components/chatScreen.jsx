import React, { useState, useEffect, useRef } from "react";
import "../src/index.css";
import Starters from "../components/Starters";
import ThinkingLoader from "../components/ThinkingLoader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatScreen = ({ chatMsg, setchatMsg, starter, setstarter }) => {
  const [questionInput, setQuestionInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  const customStyle = {
    lineHeight: "1.5",
    fontSize: "1rem",
    borderRadius: "5px",
    backgroundColor: "transparent",
    padding: "20px",
  };

  const customTextStyle = {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#E2E8F0",
    backgroundColor: "#1E293B",
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "10px",
  };

  const lineProps = (lineNumber) => {
    let style = { display: "block" };
    if (lineNumber === 1) {
      style.backgroundColor = "rgba(255, 221, 87, 0.1)";
    }
    return { style };
  };

  // Scroll to the bottom whenever chatMsg updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMsg]);

  const handleInput = (e) => {
    setQuestionInput(e.target.value);
  };

  const fetchAnswer = async (question) => {
    if (!question.trim()) return;

    setLoading(true);
    setchatMsg((prev) => [...prev, { role: "user", text: question }]);

    try {
      const response = await fetch(
        `http://localhost:3200/api/chat?question=${encodeURIComponent(question)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token if required
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the response from the server.");
      }

      const result = await response.json(); // Assuming backend sends JSON response
      const parsedResponse = parseResponse(result.answer); // Parse the response

      setchatMsg((prev) => [...prev, { role: "bot", text: parsedResponse }]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setchatMsg((prev) => [
        ...prev,
        { role: "bot", text: [{ type: "text", content: "An error occurred." }] },
      ]);
    } finally {
      setLoading(false);
      setQuestionInput("");
    }
  };

  const parseResponse = (data) => {
    const segments = data.split(/```/g);
    return segments.map((segment, index) => ({
      type: index % 2 === 0 ? "text" : "code",
      content: segment.trim(),
    }));
  };

  const handleSend = () => {
    fetchAnswer(questionInput);
    setstarter(false);
  };

  return (
    <div className="w-[80%] h-full bg-slate-900 relative">
      {starter && <Starters setQuestionInput={setQuestionInput} />}
      <div
        ref={chatContainerRef}
        className="h-[85%] box-border py-8 px-40 flex flex-col gap-3 overflow-y-auto"
      >
        {chatMsg.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "user"
                ? "bg-sky-600 ml-auto"
                : "bg-slate-600 mr-auto bg-opacity-20"
            } w-fit p-3 text-white rounded-t-lg max-w-[100%] ${
              message.role === "user" ? "rounded-bl-lg" : "rounded-br-lg"
            }`}
          >
            {message.text.map((segment, i) => (
              <div key={i}>
                {segment.type === "code" ? (
                  <SyntaxHighlighter
                    language="javascript"
                    style={solarizedlight}
                    customStyle={customStyle}
                    showLineNumbers
                    wrapLines
                    lineProps={lineProps}
                  >
                    {segment.content}
                  </SyntaxHighlighter>
                ) : (
                  <div style={customTextStyle}>
                    {segment.content
                      .split("\n")
                      .map((line, idx) =>
                        line.startsWith("**") ? (
                          <strong key={idx}>{line}</strong>
                        ) : (
                          <p key={idx}>{line}</p>
                        )
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="h-fit w-full text-white absolute bottom-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full h-fit flex justify-center item-center gap-5">
          <textarea
            value={questionInput}
            onChange={handleInput}
            className="resize-none w-[65%] bg-slate-950 text-white p-1 rounded-lg outline-sky-700 border-none"
            placeholder="Type your question here..."
          ></textarea>
          <button
            className="bg-slate-950 p-3 rounded-lg"
            onClick={handleSend}
            disabled={loading}
          >
            {!loading ? (
              <img
                className="invert"
                width="24"
                height="24"
                src="https://img.icons8.com/forma-thin-filled/24/sent.png"
                alt="sent"
              />
            ) : (
              <ThinkingLoader />
            )}
          </button>
        </div>
        <span>&copy; All rights reserved by Haseeb Iqbal</span>
      </div>
    </div>
  );
};

export default ChatScreen;
