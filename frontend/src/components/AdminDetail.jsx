import React, { useState, useEffect, useRef } from "react";

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
      coverFile: null, // user can drop a new one if they want
    });
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
    <div style={{ padding: 20 }}>
      <h1>🛠️ Admin: Manage Items</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        <h2>{form.id ? "Edit Item" : "New Item"}</h2>

        <div>
          <label>
            Name
            <br />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div>
          <label>
            Price
            <br />
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div
          onDragOver={handleDragOver}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "2px dashed #888",
            padding: "1rem",
            textAlign: "center",
            cursor: "pointer",
            margin: "1rem 0",
          }}
        >
          {form.coverFile ? (
            <img
              src={URL.createObjectURL(form.coverFile)}
              alt="Preview"
              style={{ maxHeight: 100 }}
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

        <div>
          <label>
            Description
            <br />
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            On Sale?
            <input
              name="onSale"
              type="checkbox"
              checked={form.onSale}
              onChange={handleChange}
            />
          </label>
        </div>

        {form.onSale && (
          <div>
            <label>
              Sales Price
              <br />
              <input
                name="salesPrice"
                type="number"
                step="0.01"
                value={form.salesPrice}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        )}

        <button type="submit">{form.id ? "Update Item" : "Create Item"}</button>
        {form.id && (
          <button type="button" onClick={resetForm} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Current Items</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>On Sale</th>
            <th>Sales Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.onSale === 1 ? "Yes" : "No"}</td>
              <td>{item.onSale === 1 ? item.salesPrice.toFixed(2) : "-"}</td>
              <td>
                <button onClick={() => startEditing(item)}>Edit</button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginLeft: 8 }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
