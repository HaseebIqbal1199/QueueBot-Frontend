import './index.css'
import Drawer from '../components/drawer'
import ChatScreen from '../components/chatScreen'


function App() {
  return (
    <div className='w-full h-screen bg-slate-900 flex overflow-hidden'>
      <Drawer />
      <ChatScreen />
    </div>
  )
}

export default App
