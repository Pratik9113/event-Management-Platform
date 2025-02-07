import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Login'
import EventList from './components/Event/EventList';
import CreateEventForm from './components/Event/CreateEventForm';
import Navbar from './components/Navbar';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {isLogin && <Login setIsLogin={setIsLogin} />}
      {!isLogin &&
        <>
          <Navbar />
          <Routes>
            {/* <Route path="/" element={<Login />} />
        <Route path='/' element={<EventList />} />
        <Route path='/' element={<CreateEventForm />} /> */}
            <Route path='/' element={<EventList />} />
            <Route path='/create' element={<CreateEventForm />} />
          </Routes>
        </>
      }
    </Router>
  )
}

export default App