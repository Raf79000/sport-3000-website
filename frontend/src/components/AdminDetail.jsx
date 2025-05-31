// AdminDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/App.css";

const API_BASE = "http://localhost:3000";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    price: "",
    description: "",
    onSale: false,
    salesPrice: "",
    coverFile: null,
  });
  const token = localStorage.getItem("token");
  const fileInputRef = useRef();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch(`${API_BASE}/`);
    setItems(await res.json());
  }

  function resetForm() {
    setForm({
      id: null,
      name: "",
      price: "",
      description: "",
      onSale: false,
      salesPrice: "",
      coverFile: null,
    });
    // Clear file preview when resetting
    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }

  function handleFileDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setForm((f) => ({ ...f, coverFile: file }));
    }
  }

  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) setForm((f) => ({ ...f, coverFile: file }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = form.id ? `${API_BASE}/items/${form.id}` : `${API_BASE}/items`;
    const method = form.id ? "PUT" : "POST";
    const data = new FormData();

    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("onSale", form.onSale ? "1" : "0");
    if (form.onSale) data.append("salesPrice", form.salesPrice);
    if (form.coverFile) data.append("cover", form.coverFile);

    const res = await fetch(url, {
      method,
      body: data,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });

    if (res.ok) {
      fetchItems();
      resetForm();
    } else {
      console.error("Save failed", await res.json());
    }
  }

  function startEditing(item) {
    setForm({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description || "",
      onSale: item.onSale === 1,
      salesPrice: item.salesPrice || "",
      coverFile: null,
    });
    // Reset file input preview
    if (fileInputRef.current) fileInputRef.current.value = null;
    window.scrollTo(0, 0);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this item?")) return;
    const res = await fetch(`${API_BASE}/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchItems();
    else console.error("Delete failed", await res.json());
  }

  return (
    <div id="admin-container" className="admin-container">
      <header id="admin-header" className="admin-header">
        <h1 className="admin-title">🛠️ Admin: Manage Items</h1>
      </header>

      <form id="admin-form" className="admin-form" onSubmit={handleSubmit}>
        <h2 className="section-title">{form.id ? "Edit Item" : "New Item"}</h2>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div
          id="file-drop-area"
          className="file-drop-area"
          onDragOver={handleDragOver}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {form.coverFile ? (
            <img
              src={URL.createObjectURL(form.coverFile)}
              alt="Preview"
              className="file-preview"
            />
          ) : (
            <p>Drag & drop image here, or click to select</p>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="3"
            className="form-input"
          />
        </div>

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            name="onSale"
            checked={form.onSale}
            onChange={handleChange}
            id="onSale"
            className="form-checkbox"
          />
          <label htmlFor="onSale">On Sale</label>
        </div>

        {form.onSale && (
          <div className="form-group">
            <label htmlFor="salesPrice">Sales Price</label>
            <input
              id="salesPrice"
              name="salesPrice"
              type="number"
              step="0.01"
              value={form.salesPrice}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save Item
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>

      <section id="items-section" className="items-section">
        <h2 className="section-title">Items List</h2>

        <div className="items-list">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="item-row">
                <div className="item-details">
                  <p>
                    <strong>#{item.id}</strong> – {item.name} – ${item.price}{" "}
                    {item.onSale ? `(Sale: ${item.salesPrice})` : ""}
                  </p>
                </div>
                <div className="item-actions">
                  <button
                    onClick={() => startEditing(item)}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-delete btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-items-text">No items found</p>
          )}
        </div>

        <div className="refresh-container">
          <button onClick={fetchItems} className="btn btn-primary">
            Refresh Items
          </button>
        </div>
      </section>
    </div>
  );
}
