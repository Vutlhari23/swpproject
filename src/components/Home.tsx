import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">ListWise</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">


          <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
           <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dustbininteraction">Logout</Link>
          </li>

        </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-fluid py-5" style={{
        background: 'linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)',
        minHeight: '100vh'
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 text-success fw-bold">Grocery List Manager</h1>
            <p className="lead text-muted">
              The app allows customers to list grocery items on a shopping list. For each item purchased,
              customers record its usage, such as "finished," "expired," or "discarded." Based on this usage
              data and information from other customers, the system suggests which items to buy or avoid,
              with recommendations powered by AI. Customers can also list items for donation, and
              charity organizations can view and collect the listed items. Shop owners can view comments
              on their listed products.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card shadow-sm border-success" style={{ background: 'linear-gradient(to right, #e8f5e9, #c8e6c9)' }}>
                <div className="card-body">
                  <h5 className="card-title text-success">📝 Create Your List</h5>
                  <p className="card-text">Start by creating a new grocery list tailored to your meal plans and preferences.</p>
                  <Link className="btn btn-primary" to="create-list">Create List</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-primary" style={{ background: 'linear-gradient(to right, #e3f2fd, #bbdefb)' }}>
                <div className="card-body">
                  <h5 className="card-title text-primary">📋 View Existing Lists</h5>
                  <p className="card-text">Access your saved grocery lists, update them, or mark items as bought.</p>
                  
                  <Link className="btn btn-primary" to="view-list">Create List</Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-warning" style={{ background: 'linear-gradient(to right, #fff8e1, #ffe082)' }}>
                <div className="card-body">
                  <h5 className="card-title text-warning">🍽️ Meal Planner</h5>
                  <p className="card-text">Plan your meals for the week and automatically generate shopping lists.</p>
                  <a href="/planner" className="btn btn-warning text-white">Go to Planner</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-info" style={{ background: 'linear-gradient(to right, #e1f5fe, #b3e5fc)' }}>
                <div className="card-body">
                  <h5 className="card-title text-info">📊 Grocery Stats</h5>
                  <p className="card-text">Track your spending, favorite items, and grocery trends over time.</p>
                  <a href="/stats" className="btn btn-info text-white">View Stats</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-danger" style={{ background: 'linear-gradient(to right, #ffebee, #ffcdd2)' }}>
                <div className="card-body">
                  <h5 className="card-title text-danger">💡 AI Recommendations</h5>
                  <p className="card-text">Get smart suggestions on what to buy or avoid based on usage and community feedback.</p>
                  <a href="/recommendations" className="btn btn-danger">Get Suggestions</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-secondary" style={{ background: 'linear-gradient(to right, #f3e5f5, #e1bee7)' }}>
                <div className="card-body">
                  <h5 className="card-title text-secondary">🎁 Donate Items</h5>
                  <p className="card-text">List unused items for donation. Help others and reduce waste.</p>
                  <a href="/donate" className="btn btn-secondary">Donate Now</a>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card shadow-sm border-dark" style={{ background: 'linear-gradient(to right, #cfd8dc, #b0bec5)' }}>
                <div className="card-body">
                  <h5 className="card-title text-dark">🛒 Shop Owner Insights</h5>
                  <p className="card-text">View feedback and comments on your listed products from customers.</p>
                  <a href="/insights" className="btn btn-dark">View Feedback</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
