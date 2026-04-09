import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './Pages/Home/home';
import Profile from './Pages/Profile/profile';
import MyList from './Pages/MyList/mylist';
import AudioPlayer from './Components/AudioPlayer/player';
import { ApiProvider } from './Context/apiContext';
import SearchPage from './Pages/Search/Search';   
import Lines from './Pages/Lines/Lines';
import Login from './Register/Login';
import LoginSuccess from './Register/LoginSuccess';
import './App.css';

function App() {
  return (
    <Router>
      <ApiProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/player/:storyId" element={<AudioPlayer />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/lines" element={<Lines />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login-success" element={<LoginSuccess />} />
          </Routes>
        </div>
      </ApiProvider>
    </Router> 
  );
}

export default App;