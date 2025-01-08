import './index.css';
import Drawer from '../components/Drawer';
import ChatScreen from '../components/ChatScreen';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoute from '../components/ProtectedRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [chatMsg, setchatMsg] = useState([]); // Chat messages
  const [starter, setstarter] = useState(true); // Initial chat screen state

  return (
    <Router>
      <div className="w-full h-screen bg-slate-900 flex overflow-hidden">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route for Chat Screen */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <>
                  <Drawer setchatMsg={setchatMsg} setstarter={setstarter} />
                  <ChatScreen
                    chatMsg={chatMsg}
                    setchatMsg={setchatMsg}
                    starter={starter}
                    setstarter={setstarter}
                  />
                </>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
