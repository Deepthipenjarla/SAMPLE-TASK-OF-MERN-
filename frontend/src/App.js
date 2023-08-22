import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Formlogin from './components/register';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Formlogin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
