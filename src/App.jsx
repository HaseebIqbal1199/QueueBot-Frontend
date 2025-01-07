import './index.css'
import Drawer from '../components/drawer'
import ChatScreen from '../components/chatScreen'
import { useState } from 'react'



function App() {
  const [chatMsg, setchatMsg] = useState([]);
  const [starter, setstarter] = useState(true);
  return (
    <div className='w-full h-screen bg-slate-900 flex overflow-hidden'>
      <Drawer setchatMsg={setchatMsg} setstarter={setstarter} />
      <ChatScreen chatMsg={chatMsg} setchatMsg={setchatMsg} starter={starter} setstarter={setstarter} />
    </div>
  )
}

export default App
