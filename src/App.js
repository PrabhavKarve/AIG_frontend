import './App.css';
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';
import SignUp from './Components/ImageGenerator/Signup';
import Login from './Components/ImageGenerator/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/home" element={<ImageGenerator/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
