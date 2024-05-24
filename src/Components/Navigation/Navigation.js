import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; 

function Navigation() {
  return (
    <nav className="navbar navbar-expand-sm bg-danger navbar-dark navbar">
    <div className="container-fluid ">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Travel-Fun</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/activities">Activities</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/reviews">Reviews</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Navigation;


  
