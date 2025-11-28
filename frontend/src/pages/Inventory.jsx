import React from "react";
import "../styles/Inventory.css";
import logo from "../assets/yolo-hospitalar-logo.png";
import { FiSearch, FiSliders } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

const Inventory = () => {
  const items = [
    {
      sku: "SKU78901",
      name: "Syringe 5ml",
      current: 1500,
      ideal: 2000,
      movement: "2023-10-26 14:30",
      status: "In Stock",
      color: "green",
    },
    {
      sku: "SKU12345",
      name: "Sterile Gloves (Box of 100)",
      current: 45,
      ideal: 100,
      movement: "2023-10-25 09:15",
      status: "Low Stock",
      color: "orange",
    },
    {
      sku: "SKU67890",
      name: "Pain Reliever (500mg)",
      current: 0,
      ideal: 50,
      movement: "2023-10-24 16:00",
      status: "Out of Stock",
      color: "red",
    },
  ];

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <div className="inventory-header-left">
          <span className="back-arrow">←</span>
          <img src={logo} alt="YOLO Hospitalar Logo" className="inventory-logo" />
          <h2>YOLO Hospitalar</h2>
        </div>
        <div className="inventory-header-icons">
          <span className="icon">🔔</span>
        </div>
      </header>
      <header className="inventory-header">
        <h2>Inventory & Traceability</h2>
      </header>

      <div className="inventory-search">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search product code or name..."
            className="search-input"
          />
        </div>
        <button className="filter-btn">
          <FiSliders />
        </button>
      </div>

      <div className="inventory-list">
        {items.map((item, index) => (
          <div key={index} className="inventory-card">
            <div className="inventory-card-header">
              <h3 className="sku">{item.sku}</h3>
              <span className={`status-badge ${item.color}`}>
                {item.status}
              </span>
            </div>

            <p className="item-name">{item.name}</p>

            <div className="stock-info">
              <p>
                <strong>Current Quantity</strong> <br /> {item.current}
              </p>
              <p>
                <strong>Ideal Stock</strong> <br /> {item.ideal}
              </p>
            </div>

            <p className="last-movement">
              <strong>Last Movement</strong> <br /> {item.movement}
            </p>

            <button className="history-btn">
              <FaClock className="clock-icon" />
              View Item History
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
