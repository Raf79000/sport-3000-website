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
      coverFile: null,
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
    <div>
      <header>
        <h1>🛠️ Admin: Manage Items</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <h2>{form.id ? "Edit Item" : "New Item"}</h2>

        <div>
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-input-bg border border-input-border rounded-md p-sm text-text-color"
          />
        </div>

        <div>
          <label>Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full bg-input-bg border border-input-border rounded-md p-sm text-text-color"
          />
        </div>

        <div
          onDragOver={handleDragOver}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current.click()}
          className="mb-md p-md border-2 border-border-color rounded-md text-center text-text-muted cursor-pointer"
        >
          {form.coverFile ? (
            <img
              src={URL.createObjectURL(form.coverFile)}
              alt="Preview"
              className="max-h-24 mx-auto"
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
          <label>Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-input-bg border border-input-border rounded-md p-sm text-text-color"
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="onSale"
            checked={form.onSale}
            onChange={handleChange}
            id="onSale"
            className="mr-xs"
          />
          <label htmlFor="onSale">On Sale</label>
        </div>

        {form.onSale && (
          <div>
            <label>Sales Price</label>
            <input
              name="salesPrice"
              type="number"
              step="0.01"
              value={form.salesPrice}
              onChange={handleChange}
              required
              className="w-full bg-input-bg border border-input-border rounded-md p-sm text-text-color"
            />
          </div>
        )}

        <button type="submit">
          Save Item
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="btn btn-secondary mt-md ml-sm"
        >
          Reset
        </button>
      </form>

      <section>
        <h2>Items List</h2>
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id}>
                <div>
                  <div>
                    <p>
                      <strong>#{item.id}</strong> – {item.name} – ${item.price}{" "}
                      {item.onSale ? `(Sale: ${item.salesPrice})` : ""}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => startEditing(item)}
                      className="btn btn-secondary text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-delete text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
        <button onClick={fetchItems}>
          Refresh Items
        </button>
      </section>
    </div>
  );
}
