import React, { useState } from "react";
import "./App.css";
import SuperAdminScreen from '../src/components/Role/SuperAdminScreen';
import SalesExecutiveScreen from '../src/components/Role/SalesExecutiveScreen';
import SalesManagerScreen from '../src/components/Role/SalesManagerScreen';

function App() {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {


    if ((role === 'SuperAdmin' && id === 'superadmin' && password === 'password') ||
      (role === 'SalesExecutive' && id === 'salesexecutive' && password === 'password') ||
      (role === 'SalesManager' && id === 'salesmanager' && password === 'password')) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (loggedIn) {
    return (
      <div>
        {role === "SuperAdmin" && <SuperAdminScreen />}
        {role === "SalesExecutive" && <SalesExecutiveScreen />}
        {role === "SalesManager" && <SalesManagerScreen />}
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 style={{background:'grey'}}>Login</h2>
      <div>
        <label>
          <input
            type="radio"
            value="SuperAdmin"
            checked={role === 'SuperAdmin'}
            onChange={(e) => setRole(e.target.value)}
          />
          Super Admin
        </label><br />
        <label>
          <input
            type="radio"
            value="SalesExecutive"
            checked={role === 'SalesExecutive'}
            onChange={(e) => setRole(e.target.value)}
          />
          Sales Executive
        </label> <br />
        <label>
          <input
            type="radio"
            value="SalesManager"
            checked={role === 'SalesManager'}
            onChange={(e) => setRole(e.target.value)}
          />
          Sales Manager
        </label>
      </div> <br />
      <div>
        <input style={{border:'1px solid grey'}}
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div> <br />
      <div>
        <input style={{border:'1px solid grey'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div> <br />
      <button style={{background:'red', padding:'6px 12px'}} onClick={handleLogin}>Login</button>
    </div>
  );
}

export default App;