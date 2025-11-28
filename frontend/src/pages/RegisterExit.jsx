import React from "react";
import "../styles/RegisterExit.css";
import logo from "../assets/yolo-hospitalar-logo.png";

export default function RegisterExit() {
  return (
    <div className="register-exit-page">
      {/* Cabeçalho padronizado */}
      <header className="header">
        <div className="header-left">
          <img src={logo} alt="YOLO Hospitalar" className="header-logo" />
          <h1 className="header-title">YOLO Hospitalar</h1>
        </div>
        <h2 className="page-title">Product Exit</h2>
      </header>

      {/* Conteúdo principal */}
      <main className="exit-content">
        <form className="exit-form">
          <div className="form-group">
            <label>Product Search</label>
            <div className="input-container">
              <span className="input-icon">🔍</span>
              <input type="text" placeholder="Enter product name or code" />
            </div>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <div className="input-container">
              <span className="input-icon">📦</span>
              <input type="number" placeholder="0" />
            </div>
          </div>

          <div className="form-group">
            <label>Date</label>
            <div className="input-container">
              <span className="input-icon">📅</span>
              <input type="date" defaultValue="2025-11-10" />
            </div>
          </div>

          <div className="form-group">
            <label>Responsible User</label>
            <div className="input-container">
              <span className="input-icon">👤</span>
              <input type="text" placeholder="Doctor's Name or ID" />
            </div>
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              rows="3"
              placeholder="Add any additional notes about the movement..."
            ></textarea>
          </div>

          <button type="submit" className="exit-button">
            Register Exit
          </button>
        </form>
      </main>
    </div>
  );
}
