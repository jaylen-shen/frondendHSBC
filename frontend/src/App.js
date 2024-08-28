import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Dashboard from './pages/Dashboard.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import UserProfile from './pages/UserProfile.js'; // Import the UserProfile component


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Main route for the home page or default route */}
          <Route path="/" element={<div>Home Page Content</div>} />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Login route */}
          <Route path="/login" element={<Login />} />

          {/* Register route */}
          <Route path="/register" element={<Register />} />

          {/* User Profile route */}
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
