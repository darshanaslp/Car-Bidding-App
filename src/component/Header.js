import React, { useState } from 'react';
import { NavLink  } from 'react-router-dom'; 

const Header = () => {
   
    return (
      <header className="App-header">
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <div className="container">
          <span className="navbar-brand mb-0 h1">Vehicle List App</span>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" activeclassname="active" exact="true">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/bid" activeclassname="active">
                  <i className="fas fa-shopping-cart"></i> Bid
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    );
  };
  

export default Header;