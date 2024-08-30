import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './Login.css'; // Import the CSS file for styling

function Login() {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch('http://localhost:5000/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       navigate("/home"); // Redirect to Home page on successful login
  //     } else {
  //       setError(data.message); // Show error message from server
  //     }
  //   } catch (error) {
  //     setError("Something went wrong. Please try again."); // Show general error message
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "success") {
          navigate("/home");
        } else {
          setError(result.data); // Display error if login fails
        }
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>

      {/* Signup Link */}
      <div className="signup-link">
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
