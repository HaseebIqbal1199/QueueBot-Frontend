import './index.css'
import Drawer from '../components/drawer'
import ChatScreen from '../components/chatScreen'
import { useState } from 'react'



function App() {
  const [chatMsg, setchatMsg] = useState([]);
  const [starter, setstarter] = useState(true);

  const [currentModel, setcurrentModel] = useState("Gemma_27B")

  return (
    <div className='w-full h-screen bg-slate-900 flex overflow-hidden'>
      <Drawer setchatMsg={setchatMsg} currentModel={currentModel} setcurrentModel={setcurrentModel} setstarter={setstarter} />
      <ChatScreen chatMsg={chatMsg} currentModel={currentModel} setchatMsg={setchatMsg} starter={starter} setstarter={setstarter} />
    </div>
  )
}

export default App
