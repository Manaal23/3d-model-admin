import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const token = localStorage.getItem('token') ?? null;
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Admin Model viewer</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title d-block" id="offcanvasNavbarLabel">Hi There!</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div>
        {
          token ? 
          <button type="button" className="btn btn-danger btn-lg ml-5 me-2" style={{marginLeft: '10px'}}
          onClick={() => {localStorage.clear(); navigate('/', {replace:true})}}>Logout</button>
           : <>
  <button type="button" className="btn btn-primary btn-lg ml-5 me-2" style={{marginLeft: '10px'}} onClick={() => navigate('/signin', {replace:true})}>Login</button>
  <button type="button" className="btn btn-outline-primary btn-lg" onClick={() => navigate('/signup', {replace:true})}>Create an account</button>
           </>

        }
</div>
    </div>
  </div>
</nav>
  )
}

export default Navbar