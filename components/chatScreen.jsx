import React, { useState } from "react";
import "../src/index.css";
import Starters from "./starters";
import ThinkingLoader from "./thinkingLoader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatScreen = () => {
  const [questionInput, setquestionInput] = useState("");
  const [starter, setstarter] = useState(true);
  const [chatMsg, setchatMsg] = useState([]);
  const [loading, setloading] = useState(false);

  const customStyle = {
    lineHeight: '1.5',
    fontSize: '1rem',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    padding: '20px'
  };

  const customTextStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#E2E8F0',
    backgroundColor: '#1E293B',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
  };

  const lineProps = (lineNumber) => {
    let style = { display: 'block' };
    if (lineNumber === 1) {
      style.backgroundColor = 'rgba(255, 221, 87, 0.1)';
    }
    return { style };
  };

  const handleInput = (e) => {
    setquestionInput(e.target.value);
  };

  const parseResponse = (data) => {
    // Split the response into code blocks and text based on triple backticks
    const segments = data.split(/```/g);
    return segments.map((segment, index) => ({
      type: index % 2 === 0 ? "text" : "code", // Alternate between text and code
      content: segment.trim(),
    }));
  };

  function getanswer(question) {
    setchatMsg((prev) => [...prev, { role: "question", text: question }]);
    fetch(`https://queuebotapi.vercel.app/queuebot?question=${question}`)
      .then((res) => res.text())
      .then((data) => {
        console.log("Answer", data);
        setquestionInput("");
        const parsedData = parseResponse(data);
        setchatMsg((prev) => [...prev, { role: "answer", text: data }]);
        setloading(false);
      });
    console.log(question);
  }

  return (
    <div className="w-[80%] h-full bg-slate-900 relative">
      {starter && <Starters setquestionInput={setquestionInput} />}
      <div className="h-[85%] box-border py-8 px-40 flex flex-col gap-3 overflow-y-auto">
        {chatMsg.map((message, index) => {
          return (
            <div
              key={index}
              className={`${message.role === "question"
                ? "bg-sky-600 ml-auto"
                : "bg-slate-600 mr-auto bg-opacity-20"
                } w-fit p-3 text-white rounded-t-lg max-w-[100%] ${message.role === "question"
                  ? "rounded-bl-lg"
                  : "rounded-br-lg"
                }`}
            >
              {message.role === "question" ? (
                <pre className="max-w-full text-wrap">{message.text}</pre>
              ) : (
                message.text.map((segment, i) => (
                  <div key={i}>
                    {segment.type === "code" ? (
                      <SyntaxHighlighter
                        language="java"
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
                ))
              )}
            </div>
          );
        })}
      </div>
      <div className="h-fit w-full text-white absolute bottom-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full h-fit flex justify-center item-center gap-5">
          <textarea
            name=""
            value={questionInput}
            onInput={handleInput}
            className="resize-none w-[65%] bg-slate-950 text-white p-1 rounded-lg outline-sky-700 border-none"
          ></textarea>
          <button
            className="bg-slate-950 p-3 rounded-lg"
            onClick={() => {
              getanswer(questionInput);
              setstarter(false);
              setloading(true);
            }}
          >
            {!loading ? (
              <img
                className="invert"
                width="24"
                height="24"
                src={"https://img.icons8.com/forma-thin-filled/24/sent.png"}
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
