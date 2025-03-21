import React from "react";
import "../src/index.css";

import { FaEdit, FaTrash } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const Drawer = ({ setchatMsg, setstarter,currentModel, setcurrentModel }) => {
  const handleNewChat = (target) => {
    setchatMsg([]);
    setstarter(true);
  };
  const handleModelChange = (event) => {
    setcurrentModel(event.target.value);
    console.log(currentModel);
    
  };

  return (
    <div className="w-[20%] h-full bg-slate-950 open-sans box-border p-6 flex flex-col gap-4">
      <h1 className="text-slate-700 text-3xl font-bold">
        <a href="/">QueueBot</a>
      </h1>
      <div className="w-full h-[70%] bg-slate-600/5 pt-2 rounded-lg flex flex-col items-center">
        {/* Chats */}
        <div className="w-[90%] h-full flex flex-col overflow-auto space-y-4 overflow-y-auto">
          <div
            onClick={handleNewChat}
            className="flex justify-between items-center p-2 bg-slate-900 rounded-lg hover:bg-slate-800/60 cursor-pointer"
          >
            <span className="text-white w-[70%] ml-[5%] ">New Chat</span>
            <div className="flex space-x-3">
              <FaEdit className="text-white text-xl" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-slate-700 text-3xl font-bold">
        <span>Models</span>
      </h1>
      <div className="w-full h-auto bg-slate-600/5 rounded-lg box-border flex items-center justify-center p-2">
        <select
          className="w-full mt-4 p-2 bg-slate-900 text-white rounded-lg"
          onChange={handleModelChange}
        >
          <option value="Gemma_27B">Gemma 27B (updated)</option>
          <option value="deepseek_r1">Deepseek r1</option>
        </select>
      </div>
    </div>
  );
};

export default Drawer;
