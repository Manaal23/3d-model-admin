import React from 'react';
import './App.css';
import Signup from './components/signup';
import Signin from './components/signin';
import Dashboard from './components/dashboard';
import Navbar from './common/navbar';

function App() {
  return (
    <div className="App">
      {/* <Signup/> */}
      {/* <Signin /> */}
      <Dashboard />
    </div>
  );
}

export default App;
