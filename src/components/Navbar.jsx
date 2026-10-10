import React from "react";
import { Link } from 
"react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">+</span>
        <span>MediBook</span>
      </Link>

      <nav>
        <Link to="/" className="nav-link">
          Find Doctors
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
