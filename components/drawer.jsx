import React from 'react'
import '../src/fonts.css'
import { FaEdit, FaTrash} from 'react-icons/fa'
import { FaGear } from "react-icons/fa6"

const Drawer = () => {
  return (
    <div className='w-[20%] h-full bg-slate-950 open-sans box-border p-6 flex flex-col justify-between gap-4'>
      <h1 className='text-slate-700 text-3xl font-bold'><a href="/">QueueBot</a></h1>
      <div className='w-full h-[77%] bg-slate-600/5 pt-2 rounded-lg flex flex-col items-center'>
        {/* Chats */}
        <div className='w-[90%] h-full flex flex-col overflow-auto space-y-4 overflow-y-auto'>
          <div className='flex justify-between items-center p-2 bg-slate-700 rounded-lg hover:bg-slate-600'>
            <span className='text-white w-[70%] ml-[5%] '>Chat Name</span>
            <div className='flex space-x-3'>
              <FaEdit className='text-white cursor-pointer text-xl' />
              <FaTrash className='text-white cursor-pointer text-xl' />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[13%] bg-slate-600/5 rounded-lg'>
        <div className='flex items-center justify-between p-2'></div>
        <div className='flex items-center space-x-3 m-2'>
          <img src='../public/vite.svg' alt='User Pic' className='w-8 h-8 rounded-full' />
          <div className='text-white font-semibold'>Username</div>
          <div className='text-slate-400 text-sm'>Plan: Premium</div>
        </div>
        <div className='flex items-center space-x-2 cursor-pointer justify-around p-2 bg-slate-700 rounded-lg hover:bg-slate-600'>
          <span className='text-white'>Settings</span>
          <FaGear className='text-white text-xl' />
        </div>
      </div>

    </div>
  )
}

export default Drawer