import React from 'react'
import Navs from '../common/navs'
import ModelDetail from './modelDetail'
import ModelList from './modelList'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './privateRoutes';
import Signin from './signin';
import Signup from './signup';
import Navbar from '../common/navbar';

function Dashboard() {

  const token = localStorage.getItem('token');
  
  return (
    <Router>
      <Navbar />
    <div className='d-flex'>
    {token ? <Navs /> : null}
    <div className="flex-fill p-2 mt-5">
      <Routes>
      <Route path="/" element={<PrivateRoute component={ModelList}/>} />
        <Route path="/product-detail/:id" element={<PrivateRoute component={ModelDetail}/>} />
        <Route path="/create" element={<PrivateRoute component={ModelDetail}/>} />
        <Route path="/signup" Component={Signup}/>
        <Route path="/signin" Component={Signin}/>
        {/* <PrivateRoute path="/create" component={ModelDetail} /> */}
        </Routes>
      </div>
    </div>
    </Router>
  )
}

export default Dashboard