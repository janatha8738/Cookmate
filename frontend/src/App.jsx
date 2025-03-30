import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Add this
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import MyProfile from './pages/MyProfile.jsx';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/profile" element={<MyProfile />} />
          </Routes>
      </Router>
  );
}

export default App;