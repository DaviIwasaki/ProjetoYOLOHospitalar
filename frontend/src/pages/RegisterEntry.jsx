import React, { useState } from "react";
import "../styles/RegisterEntry.css";
import logo from "../assets/yolo-hospitalar-logo.png";

export default function RegisterEntry() {
  const [formData, setFormData] = useState({
    productSearch: "",
    quantity: "",
    date: "",
    responsibleUser: "",
    origin: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entry Registered:", formData);
    // aqui você pode chamar API / redirecionar / etc.
  };

  return (
    <div className="register-entry-page"> {/* root scoping */}
      <header className="register-entry-header">
        <div className="register-entry-header-left">
          <img src={logo} alt="YOLO Hospitalar" className="register-entry-logo" />
          <span className="register-entry-brand">YOLO Hospitalar</span>
        </div>
        <h1 className="register-entry-title">Product Entry</h1>
      </header>

      <main className="register-entry-main">
        <form className="register-entry-form" onSubmit={handleSubmit}>
          {/* Product Details */}
          <section className="rei-section">
            <h2 className="rei-section-title">Product Details</h2>

            <label className="rei-label">
              Product Search
              <div className="rei-input-wrapper">
                <span className="rei-icon">🔎</span>
                <input
                  name="productSearch"
                  value={formData.productSearch}
                  onChange={handleChange}
                  placeholder="Search by name or code"
                  className="rei-input"
                  type="text"
                />
              </div>
            </label>

            <label className="rei-label">
              Quantity
              <div className="rei-input-wrapper">
                <span className="rei-icon">📦</span>
                <input
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 50 units"
                  className="rei-input"
                  type="text"
                />
              </div>
            </label>
          </section>

          {/* Entry Information */}
          <section className="rei-section">
            <h2 className="rei-section-title">Entry Information</h2>

            <label className="rei-label">
              Date
              <div className="rei-input-wrapper">
                <span className="rei-icon">📅</span>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="rei-input"
                  type="date"
                />
              </div>
            </label>

            <label className="rei-label">
              Responsible User
              <div className="rei-input-wrapper">
                <span className="rei-icon">👤</span>
                <input
                  name="responsibleUser"
                  value={formData.responsibleUser}
                  onChange={handleChange}
                  placeholder="Enter user name or ID"
                  className="rei-input"
                  type="text"
                />
              </div>
            </label>

            <label className="rei-label">
              Product Origin (Optional)
              <div className="rei-input-wrapper">
                <span className="rei-icon">🧾</span>
                <input
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g., Purchase, Donation"
                  className="rei-input"
                  type="text"
                />
              </div>
            </label>
          </section>

          {/* Additional Notes */}
          <section className="rei-section">
            <h2 className="rei-section-title">Additional Notes</h2>

            <label className="rei-label">
              Notes (Optional)
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any relevant details or instructions here..."
                className="rei-textarea"
                rows="4"
              />
            </label>
          </section>

          <button type="submit" className="rei-submit">
            Register Entry
          </button>
        </form>
      </main>
    </div>
  );
}
