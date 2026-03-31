import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/home';
import Profile from './Pages/Profile/profile';
import MyList from './Pages/MyList/mylist';
import AudioPlayer from './Components/AudioPlayer/player';
import { ApiProvider } from './Context/apiContext';
import './App.css';

function App() {
  return (
    <Router>
      <ApiProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/player" element={<AudioPlayer />} />
          </Routes>
        </div>
      </ApiProvider>
    </Router> 
  );
}

export default App;