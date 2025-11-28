import React from "react";
import "../styles/ProductProfile.css";
import { FiArrowLeft } from "react-icons/fi";
import { FaBox, FaTag, FaWarehouse, FaClock, FaUser } from "react-icons/fa";
import logo from "../assets/yolo-hospitalar-logo.png"; // logo da marca
import sampleProduct from "../assets/sample-product.jpg"; // imagem genérica de produto

const ProductProfile = () => {
  const history = [
    { date: "2024-07-24", type: "Entry", qty: 100, user: "Jane" },
    { date: "2024-07-23", type: "Exit", qty: 10, user: "Sarah" },
    { date: "2024-07-22", type: "Exit", qty: 5, user: "John" },
    { date: "2024-07-21", type: "Entry", qty: 50, user: "Staff" },
  ];

  return (
    <div className="product-profile-container">
      {/* ===== Cabeçalho ===== */}
      <header className="productProfile-header">
        <div className="productProfile-header-left">
          <span className="back-arrow">←</span>
          <img src={logo} alt="YOLO Hospitalar Logo" className="productProfile-logo" />
          <h2>YOLO Hospitalar</h2>
        </div>
        <div className="productProfile-header-icons">
          <span className="icon">🔔</span>
        </div>
      </header>

      {/* ===== Conteúdo ===== */}
      <main className="product-content">
        {/* Card principal */}
        <div className="product-card">
          <img src={sampleProduct} alt="Product" className="product-image" />
          <h3 className="product-title">Insulin Syringe 1ml (29G x 1/2)</h3>
          <div className="product-info">
            <p>
              <FaBox className="icon" /> Category:{" "}
              <span>Medical Consumables</span>
            </p>
            <p>
              <FaTag className="icon" /> Batch: <span>ABC-78901</span>
            </p>
            <p>
              <FaBox className="icon" /> Quantity: <span>250</span>
            </p>
          </div>
        </div>

        {/* Detalhes */}
        <div className="details-card">
          <h4>Details</h4>
          <p>
            <strong>Supplier:</strong> MediSupply Corp.
          </p>
          <p>
            <strong>Expiration Date:</strong> 2025-08-30
          </p>
          <p>
            <FaWarehouse className="icon" /> Storage Location: Pharmacy Ward C,
            Shelf 3-B
          </p>
          <p>
            <FaClock className="icon" /> Last Update: 2024-07-25 14:30
          </p>
        </div>

        {/* Histórico */}
        <div className="history-card">
          <h4>History</h4>
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Qty</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, index) => (
                <tr key={index}>
                  <td>{h.date}</td>
                  <td>
                    <span
                      className={`type-badge ${
                        h.type === "Entry" ? "entry" : "exit"
                      }`}
                    >
                      {h.type}
                    </span>
                  </td>
                  <td>{h.qty}</td>
                  <td>
                    <FaUser className="user-icon" /> {h.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botão */}
        <button className="edit-btn">Edit Product</button>
      </main>
    </div>
  );
};

export default ProductProfile;
