import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/'}>
            ASD Products
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="form-check form-switch ms-auto">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? 'Dark Mode' : 'Light Mode'}
            </label>
          </div>
          <Link className='btn btn-outline-primary ms-3' to="/adduser">Log in</Link>
          <Link className='btn btn-outline-primary ms-3' to="/addproduct">Add Product</Link>
        </div>
      </nav>
    </div>
  );
}
