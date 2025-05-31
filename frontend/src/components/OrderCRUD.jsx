import React, { useState, useEffect } from "react";

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
    console.log(form.id ? "Updating order" : "Creating new order");
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
      <h1>Order Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerId"
          placeholder="Customer ID"
          value={form.customerId}
          onChange={handleChange}
          required
        />
        <inputorders
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={form.paymentMethod}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Order</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
      <h2>Orders List</h2>
      <ul>
        {console.log(orders)}
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.customerId}</strong> - ${order.totalAmount} -{" "}
            {order.paymentMethod} - {order.status} {" "}
            <button
              onClick={() => {
                setForm(order);
              }}
            >
              Edit
            </button>
          </li>
        ))}
        {orders.length === 0 && <li>No orders found</li>}
      </ul>
      <button onClick={fetchOrders}>Refresh Orders</button>
    </div>
  );
}
