import React from "react";

const Starters = ({setquestionInput}) => {
  return (
    <div className="absolute top-[30%] w-full h-[25%]  box-border px-40 flex justify-between">
      <div onClick={()=>{setquestionInput("Tell me Something about your Owner")}} className="bg-transparent border-2 border-slate-800 w-[20%] h-full rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-slate-500/10 cursor-pointer ">
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/fluency/48/dog-training.png"
          alt="dog-training"
        />
        <span className="text-center text-white opacity-55 select-none">Tell me Something about your Owner</span>
      </div>
      <div onClick={()=>{setquestionInput("How does the introduction of a new technology, such as AI, change the job market in specific sectors like healthcare or finance?")}} className="bg-transparent border-2 border-slate-800 w-[20%] h-full rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-slate-500/10 cursor-pointer ">
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/brain-3.png"
          alt="brain-3"
        />
        <span className="text-center text-white opacity-55 select-none">Show me your analytical Capability</span>
      </div>
      <div onClick={()=>{setquestionInput("Make an image of Evil Hacker")}} className="bg-transparent border-2 border-slate-800 w-[20%] h-full rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-slate-500/10 cursor-pointer ">
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/scribby/50/image.png"
          alt="image"
        />
        <span className="text-center text-white opacity-55 select-none">Make an image of Evil Hacker</span>
      </div>
      <div onClick={()=>{setquestionInput("Write a Bubble sort Program in cpp and explain it!")}} className="bg-transparent border-2 border-slate-800 w-[20%] h-full rounded-lg flex flex-col justify-center items-center gap-3 hover:bg-slate-500/10 cursor-pointer ">
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/fluency/48/bug.png"
          alt="bug"
        />
        <span className="text-center text-white opacity-55 select-none">Coding Problem</span>
      </div>
    </div>
  );
};

export default Starters;
