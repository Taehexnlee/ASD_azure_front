import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const { user, cart, logout } = useUser();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to the home page after logout
  };

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

          {/* Display the Cart button for non-admin users */}
          {user && !user.isAdmin && (
            <div className="ms-3">
              <Link className="btn btn-outline-primary" to="/cart">
                Cart ({cart.length})
              </Link>
            </div>
          )}

          {user ? (
            <>
              {user.isAdmin && (
                <Link className='btn btn-outline-primary ms-3' to="/userpage">User Page</Link>
              )}
              <Link className='btn btn-outline-primary ms-3' to="/productpage">Product Page</Link>
              <button className='btn btn-outline-primary ms-3' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className='btn btn-outline-primary ms-3' to="/login">Login</Link>
              <Link className='btn btn-outline-primary ms-3' to="/adduser">Register</Link>
            </>
           
          )}
        </div>
      </nav>
    </div>
  );
}
