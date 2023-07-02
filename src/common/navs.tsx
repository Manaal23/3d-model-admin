import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function Navs() {

  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh' }}>
    <div className="d-flex mt-5 h-100">
      <div className="flex-fill" style={{ width: '370px' }}>
        <ul>
            <li><button type="button" className={`btn btn-primary btn-lg`} onClick={() => navigate(`/`)}>Models</button></li>
            <li><button type="button" className="btn btn-outline-dark btn-lg" onClick={() => navigate(`/create`)}>Create new model</button></li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default Navs