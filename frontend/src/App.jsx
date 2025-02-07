import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login'
import EventList from './components/Event/EventList';

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        {/* <Route path='/' element={<EventList />} /> */}
        <Route path='/' element={<EventCreate />} />
      </Routes>
    </Router>
  )
}

export default App
