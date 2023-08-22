import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard'; // Import the Dashboard component

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [user, setUser] = useState(null); // New state for user data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log('Login successful:', response.data);
      setUser(response.data.user); // Store user data in the state
    } catch (error) {
      console.error('Login failed:', error);
      // Display error message to the user
    }
  };

  return (
    <div>
      {user ? (
        <Dashboard user={user} /> // Render Dashboard component if user is logged in
      ) : (
        <form onSubmit={handleLoginSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Login;
