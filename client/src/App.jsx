// File description: Top-level UI container

import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router";
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>
  )
}

export default App
