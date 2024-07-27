import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginOne from './component/LoginOne';
import LoginTwo from './component/LoginTwo';
import LoginThree from './component/LoginThree';
import LoginFour from './component/LoginFour';

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path="/" element={<LoginOne />} />
        <Route path="/login-two" element={<LoginTwo />} />
        <Route path="/login-three" element={<LoginThree />} />
        <Route path="/login-four" element={<LoginFour />} />

      </Routes>
    </Router>
  );
}

export default App;

