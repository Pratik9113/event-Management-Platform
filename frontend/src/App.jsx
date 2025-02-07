import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login'
import EventList from './components/Event/EventList';
import CreateEventForm from './components/Event/CreateEventForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLogin && <Login setIsLogin={setIsLogin} />}

      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path='/' element={<EventList />} />
        <Route path='/' element={<CreateEventForm />} /> */}
        <Route path='/' element={<EventList />} />
      </Routes>
    </Router>
  )
}

export default App
