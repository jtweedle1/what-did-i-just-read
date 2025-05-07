// File description: Top-level UI container

import './App.css'
import Dashboard from './pages/Dashboard';
import Home from "./pages/Home"
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  )
}

export default App
