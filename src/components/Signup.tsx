import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.text();
  
      if (response.ok) {
        alert('Signup successful!');
        setFormData({ username: '', email: '', password: '' });
      } else {
        alert(result);
      }
    } catch (err) {
      alert('Signup failed: ' + err.message);
    }
  };
  

  return (
    <div className="container py-5">
      <h2 className="text-center text-success fw-bold mb-4">📝 Sign Up</h2>
      <form className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100 mb-3">Sign Up</button>
        <div className="d-flex justify-content-between">
          <Link to="/login" className="btn btn-outline-secondary">Login</Link>
          <Link to="/" className="btn btn-outline-primary">Home</Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
