// OrderCRUD.jsx (with Customer ID filter)
import React, { useState, useEffect } from "react";
import "../styles/App.css";

const API_BASE = "http://localhost:3000";

export default function OrderCRUD() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    id: null,
    userId: "",
    totalAmount: "",
    paymentMethod: "",
  });
  const [filterUserId, setFilterUserId] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    setOrders(await res.json());
  }

  function resetForm() {
    setForm({
      id: null,
      userId: "",
      totalAmount: "",
      paymentMethod: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleFilterChange(e) {
    setFilterUserId(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `${API_BASE}/orders/${form.id}`
      : `${API_BASE}/orders`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: form.userId,
        totalAmount: form.totalAmount,
        paymentMethod: form.paymentMethod,
        ...(form.id && { id: form.id }),
      }),
    });

    if (res.ok) {
      fetchOrders();
      resetForm();
    } else {
      console.error("Failed to save order", await res.json());
    }
  }

  // Filtered orders by userId (case-insensitive)
  const filteredOrders = orders.filter((order) =>
    String(order.userId).includes(filterUserId.trim())
  );

  return (
    <div id="order-container" className="order-container">
      <header id="order-header" className="order-header">
        <h1 className="order-title">Order Management</h1>
      </header>

      <main id="order-main" className="order-main">
        <form id="order-form" className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="Customer ID"
            value={form.userId}
            onChange={handleChange}
            required
            className="form-input"
            id="order-customer-id"
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={handleChange}
            required
            className="form-input"
            id="order-total-amount"
          />
          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={form.paymentMethod}
            onChange={handleChange}
            required
            className="form-input"
            id="order-payment-method"
          />
          <div className="order-form-actions">
            <button type="submit" className="btn btn-primary order-btn">
              Save Order
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="btn btn-secondary order-btn"
            >
              Reset
            </button>
          </div>
        </form>

        <div className="order-filter-container">
          <label htmlFor="filter-customer-id" className="filter-label">
            Filter by Customer ID:
          </label>
          <input
            type="text"
            id="filter-customer-id"
            value={filterUserId}
            onChange={handleFilterChange}
            placeholder="Enter Customer ID"
            className="filter-input"
          />
        </div>

        <h2 className="order-list-heading">Orders List</h2>
        <div className="table-responsive">
          <table id="order-table" className="order-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.userId}</td>
                    <td>${order.totalAmount}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        className="btn btn-accent btn-sm"
                        onClick={() => setForm(order)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-orders">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="order-refresh">
          <button className="btn btn-primary" onClick={fetchOrders}>
            Refresh Orders
          </button>
        </div>
      </main>
    </div>
  );
}
