import React, { useState, useEffect, useRef } from "react";
import "../src/index.css";
import Starters from "./starters";
import ThinkingLoader from "./thinkingLoader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatScreen = ({ chatMsg, setchatMsg, starter, setstarter, currentModel }) => {
  const [questionInput, setquestionInput] = useState("");
  const [loading, setloading] = useState(false);

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

  const handleInput = (e) => {
    setquestionInput(e.target.value);
  };

  const chatContainerRef = useRef(null); // Ref for the chat container

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMsg]);

  function getanswer(question) {
    if (!question.trim()) return; // Avoid empty submissions

    // Add the question message to the chat
    setchatMsg((prev) => [...prev, { role: "question", text: question }]);
    setloading(true); // Show loader

    console.log(currentModel)

   if (currentModel == "Gemma_27B") {
     fetch(
       `${import.meta.env.VITE_API_URL_DEV}/gemma?question=${encodeURIComponent(
         question
       )}`
     )
       .then((res) => res.text())
       .then((data) => {
         let tokenizedData = data.split(/```/g).map((chunk, index) => {
           return index % 2 === 0 ? chunk.split(" ") : chunk;
         });
 
         // Add an empty answer placeholder
         setchatMsg((prev) => [
           ...prev,
           { role: "answer", text: [], type: "text" },
         ]);
 
         let counter = 0;
         let innerCounter = 0;
 
         const generationInterval = setInterval(() => {
           setchatMsg((prev) => {
             // Copy previous state
             const updatedChat = [...prev];
             const latestMsg = { ...updatedChat[updatedChat.length - 1] }; // Clone last message
 
             // Add new tokens incrementally
             if (counter < tokenizedData.length) {
               if (Array.isArray(tokenizedData[counter])) {
                 if (innerCounter < tokenizedData[counter].length) {
                   latestMsg.text.push(tokenizedData[counter][innerCounter]);
                   innerCounter++;
                 } else {
                   counter++;
                   innerCounter = 0;
                 }
               } else {
                 latestMsg.text.push(`\`\`\`${tokenizedData[counter]}\`\`\``);
                 latestMsg.type = "code";
                 counter++;
               }
             } else {
               clearInterval(generationInterval);
               setloading(false); // Done processing
               setquestionInput("");
             }
 
             // Update state
             updatedChat[updatedChat.length - 1] = latestMsg;
             return updatedChat;
           });
         }, 6);
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
         setloading(false);
       });
   }
   if (currentModel == "deepseek_r1") {
     fetch(
       `${import.meta.env.VITE_API_URL_DEV}/deepseek/r1?question=${encodeURIComponent(
         question
       )}`
     )
       .then((res) => res.text())
       .then((data) => {
         let tokenizedData = data.split(/```/g).map((chunk, index) => {
           return index % 2 === 0 ? chunk.split(" ") : chunk;
         });
 
         // Add an empty answer placeholder
         setchatMsg((prev) => [
           ...prev,
           { role: "answer", text: [], type: "text" },
         ]);
 
         let counter = 0;
         let innerCounter = 0;
 
         const generationInterval = setInterval(() => {
           setchatMsg((prev) => {
             // Copy previous state
             const updatedChat = [...prev];
             const latestMsg = { ...updatedChat[updatedChat.length - 1] }; // Clone last message
 
             // Add new tokens incrementally
             if (counter < tokenizedData.length) {
               if (Array.isArray(tokenizedData[counter])) {
                 if (innerCounter < tokenizedData[counter].length) {
                   latestMsg.text.push(tokenizedData[counter][innerCounter]);
                   innerCounter++;
                 } else {
                   counter++;
                   innerCounter = 0;
                 }
               } else {
                 latestMsg.text.push(`\`\`\`${tokenizedData[counter]}\`\`\``);
                 latestMsg.type = "code";
                 counter++;
               }
             } else {
               clearInterval(generationInterval);
               setloading(false); // Done processing
               setquestionInput("");
             }
 
             // Update state
             updatedChat[updatedChat.length - 1] = latestMsg;
             return updatedChat;
           });
         }, 6);
       })
       .catch((error) => {
         console.error("Error fetching data:", error);
         setloading(false);
       });
   }
   }

  useEffect(() => {
    const handleEnterevent = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setstarter(false);
        getanswer(questionInput);
        console.log("running");
      }
    };
    window.addEventListener("keydown", handleEnterevent);
    return () => {
      window.removeEventListener("keydown", handleEnterevent);
    };
  }, [questionInput]);

  return (
    <div className="w-[80%] h-full bg-slate-900 relative">
      {starter && <Starters setquestionInput={setquestionInput} />}
      <div
        ref={chatContainerRef}
        className="h-[85%] box-border py-8 px-40 flex flex-col gap-3 overflow-y-auto"
      >
        {chatMsg.map((message, index) => (
          <div
            key={index}
            className={`${
              message.role === "question"
                ? "bg-sky-600/30 w-full border-2 border-[#ffffff21]"
                : "bg-slate-00 mr-auto bg-opacity-20"
            } w-fit p-3 text-white rounded-t-lg max-w-[100%] ${
              message.role === "question" ? "rounded-bl-lg" : "rounded-br-lg"
            }`}
          >
            {message.type === "code" ? (
              message.text
                .join(" ")
                .split(/```/g)
                .map((segment, idx) =>
                  idx % 2 === 0 ? (
                    <pre
                      className="whitespace-pre-wrap break-words"
                      key={idx}
                    >
                      {segment.split("**").map((part, i) =>
                        i % 2 === 1 ? (
                          <b className="text-2xl" key={i}>
                            {part.replace("`", " ").replace("`", " ")}
                          </b>
                        ) : (
                          part
                        )
                      )}
                    </pre>
                  ) : (
                    <SyntaxHighlighter
                      key={idx}
                      language="java"
                      style={solarizedlight}
                      customStyle={customStyle}
                      showLineNumbers
                      wrapLines
                      lineProps={lineProps}
                    >
                      {segment}
                    </SyntaxHighlighter>
                  )
                )
            ) : (
              <pre className="whitespace-pre-wrap break-words">
                {Array.isArray(message.text)
                  ? message.text.join(" ").split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <b className="text-xl" key={i}>
                          {part.replace("`", " ").replace("`", " ")}
                        </b>
                      ) : (
                        part
                      )
                    ) // Join array with spaces
                  : message.text}
              </pre>
            )}
          </div>
        ))}
      </div>

      <div className="h-fit w-full text-white absolute bottom-0 flex flex-col gap-2 justify-center items-center">
        <div className="w-full h-fit flex justify-center item-center gap-5">
          <textarea
            name=""
            value={questionInput}
            onInput={handleInput}
            className="resize-none w-[65%] bg-slate-950 text-white p-1 rounded-lg outline-sky-700 border-none"
            id="InputField"
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
