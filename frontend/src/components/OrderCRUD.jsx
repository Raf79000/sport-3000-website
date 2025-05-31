// OrderCRUD.jsx
import React, { useState, useEffect } from "react";
import "../styles/App.css";

const API_BASE = "http://localhost:3000";

export default function OrderCRUD() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    id: null,
    customerId: "",
    totalAmount: "",
    paymentMethod: "",
  });

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
      customerId: "",
      totalAmount: "",
      paymentMethod: "",
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
        customerId: form.customerId,
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

  return (
    <div>
      <header>
        <h1>Order Management</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerId"
            placeholder="Customer ID"
            value={form.customerId}
            onChange={handleChange}
            required
            className="p-sm"
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={form.totalAmount}
            onChange={handleChange}
            required
            className="p-sm"
          />
          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={form.paymentMethod}
            onChange={handleChange}
            required
            className="p-sm"
          />
          <div>
            <button type="submit">
              Save Order
            </button>
            <button type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        <h2>Orders List</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <span>
                <strong>{order.customerId}</strong> - ${order.totalAmount} - {order.paymentMethod} - {order.status}
              </span>
              <button
                onClick={() => {
                  setForm(order);
                }}
                className="btn btn-accent"
              >
                Edit
              </button>
            </li>
          ))}
          {orders.length === 0 && <li>No orders found</li>}
        </ul>
        <button onClick={fetchOrders}>
          Refresh Orders
        </button>
      </main>
    </div>
  );
}
