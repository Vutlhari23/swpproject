import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ViewList = () => {
  interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    dateAdded: string;
    status?: string;
    statuss?: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("User not logged in!");
      return;
    }

    const user = JSON.parse(userData);

    fetch(`http://localhost:8080/api/users/items?email=${encodeURIComponent(user.email)}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch items for user");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const withStatus = data.map((item) => ({ ...item, statuss: item.status || '' }));
        console.log(withStatus)
        setItems(withStatus);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        setError("Failed to fetch grocery items.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedItems = [...items];
    updatedItems[index].statuss = newStatus;
    setItems(updatedItems);

    // Send update to the backend
    const itemToUpdate = updatedItems[index];
    fetch(`http://localhost:8080/api/users/items/${itemToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...itemToUpdate, status: newStatus })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update item status");
        }
      })
      .catch((err) => {
        console.error("Error updating item status:", err);
        setError("Failed to update item status.");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("groceryList");
    window.location.href = "/login";
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">ListWise</a>
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
        <h2 className="text-center mb-4 text-primary fw-bold">📋 View Grocery List</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : items.length > 0 ? (
          <div className="card shadow">
            <div className="card-header bg-primary text-white fw-bold">🛍️ Items from Your Grocery List</div>
            <ul className="list-group list-group-flush">
              {items.map((item, index) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.name}</strong> - <span className="text-muted">${item.price}</span><br />
                    <small className="text-muted">Qty: {item.quantity} | Category: {item.category}</small><br />
                    <small className="text-muted">Added: {new Date(item.dateAdded).toLocaleString()}</small>
                  </div>
                  <div>
                    <select
                      className="form-select"
                      style={{ width: '150px' }}
                      value={item.statuss}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                    >
                      <option value="">{item.status}</option>
                      <option value="bought">Bought</option>
                      <option value="used">Used</option>
                      <option value="expired">Expired</option>
                      <option value="donated">Donated</option>
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center">No items found in your grocery list.</p>
        )}
      </div>
    </div>
  );
};

export default ViewList;
