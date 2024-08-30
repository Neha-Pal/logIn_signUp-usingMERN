import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // State to track signup success
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show the success message
        setSignupSuccess(true);

        // Redirect to the login page after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000); // 3-second delay before redirect
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="signup">
      <h2>Register</h2>
      {signupSuccess ? (
        <p className="success-message">Signing up successful! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Sign Up</button>
        </form>
      )}

      {/* Login Link */}
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default SignUp;
