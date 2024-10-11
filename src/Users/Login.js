import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

export default function Login() {
  let navigate = useNavigate();
  const { login } = useUser();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = credentials;

  const onInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8080/login", credentials);
      // Set user in context if login is successful
      login(result.data);
      navigate("/"); // Redirect to the home page after login
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">Login</button>
            <Link className="btn btn-outline-danger mx-2" to="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
