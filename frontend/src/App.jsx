import React, { useState } from 'react';
import SignUp from './SignUp'; // Ensure this path is correct
import LogIn from './LogIn';
import './SignUp.css';
import './LogIn.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Home from './home';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<Home />} />

        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
