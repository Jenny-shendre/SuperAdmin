import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PasswordPage from './PasswordPage';
import MyProfilePage from './MyProfilePage';



const SettingPages = () => {
  return (
    <Router>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Link to="/profile">
          <button className="bg-blue-500 text-white px-4 py-2 rounded m-2">
            My Profile
          </button>
        </Link>
        <Link to="/password">
          <button className="bg-green-500 text-white px-4 py-2 rounded m-2">
            Password
          </button>
        </Link>

        {/* <Switch> */}
          <Route path="/profile" component={MyProfilePage} />
          <Route path="/password" component={PasswordPage} />
       
      </div>
    </Router>
  );
}

export default SettingPages;