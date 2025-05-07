import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Profile.css"; // Import custom CSS for additional styling

function Profile() {
  // State to store user data
  const [user, setUser] = useState({ name: "", email: "" });
  const [formData, setFormData] = useState(user);

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData(parsedUser);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update user profile logic
    setUser(formData);
    localStorage.setItem("user", JSON.stringify(formData)); // Save updated user data to local storage
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-page container mt-5">
      <div className="card shadow p-4">
        <h1 className="text-center mb-4">Profile</h1>
        <div className="profile-info mb-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <form onSubmit={handleSubmit} className="profile-form">
          <h2 className="mb-3">Update Profile</h2>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;