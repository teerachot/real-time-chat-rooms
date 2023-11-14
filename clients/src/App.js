import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Chat from "./pages/chat";
import { useEffect } from "react";
import {  useDispatch } from 'react-redux';
import {setSocketIo} from './reducers/socketSlice'
import io from "socket.io-client";



function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const socketIo = io.connect("http://localhost:4000")
    dispatch(setSocketIo(socketIo))
  },[dispatch])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                // username={username}
                // setUsername={setUsername}
                // room={room}
                // setRoom={setRoom}
              />
            }
          />

          <Route
            path="/chat"
            element={
              <Chat
                // username={username}
                // room={room}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
