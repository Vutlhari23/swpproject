import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const CreateList = () => {

  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('groceryList');
    
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [formData, setFormData] = useState({ name: '', price: '', quantity: '', category: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.quantity && formData.category) {
      const dateAdded = new Date().toLocaleString();
      if (editIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editIndex] = { ...formData, date: updatedItems[editIndex]?.date || dateAdded };
        setItems(updatedItems);
        setEditIndex(null);
      } else {
        setItems(prev => [...prev, { ...formData, date: dateAdded }]);
      }
      setFormData({ name: '', price: '', quantity: '', category: '' });
    }
  };

  const handleEdit = (index) => {
    const item = items[index];
    setFormData({ name: item.name, price: item.price, quantity: item.quantity, category: item.category });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handlePushToDatabase = async () => {
    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        alert("User not logged in!");
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch(`http://localhost:8080/api/users/items?email=${user.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });

      if (response.ok) {
        alert("Items successfully saved to database!");
        localStorage.removeItem('groceryList');
        setItems([]);
      } else {
        alert("Failed to save items");
      }
    } catch (error) {
      console.error("Error pushing to database:", error);
      alert("Error occurred!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("groceryList");
    window.location.href = "/login";
  };
  const userData = localStorage.getItem("user");

  if (!userData) {
    alert("User not logged in!");
    return;
  }

  const user = JSON.parse(userData);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">ListWise{user.email}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <h2 className="text-center mb-4 text-success fw-bold">📝 Create Grocery List</h2>

        <form className="row g-3 mb-5" onSubmit={handleAddItem}>
          <div className="col-md-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
            </select>
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">
              {editIndex !== null ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>

        {items.length > 0 && (
          <div className="card shadow">
            <div className="card-header bg-success text-white fw-bold">🛒 Your Grocery List</div>
            <ul className="list-group list-group-flush">
              {items.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong> ({item.category})<br />
                    Quantity: {item.quantity} | Price: ${item.price}<br />
                    <small className="text-muted">Added: {item.date}</small>
                  </div>
                  <div>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="card-footer text-end">
              <button className="btn btn-success" onClick={handlePushToDatabase}>📤 Push List to Database</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateList;
