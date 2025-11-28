import React from "react";
import "../styles/NotRecognized.css";
import logo from "../assets/yolo-hospitalar-logo.png";

export default function NotRecognized() {
  return (
    <div className="not-recognized-page">
      {/* Header (standard) */}
      <header className="std-header">
        <div className="std-header-left">
          <img src={logo} alt="YOLO Hospitalar" className="std-logo" />
        </div>
        <div className="std-header-center" />
        <div className="std-header-right">
          <button className="icon-btn" aria-label="notifications">🔔</button>
        </div>
      </header>

      {/* Main content */}
      <main className="not-recognized-container">
        <div className="not-recognized-card">
          <div className="not-recognized-icon">⚠️</div>

          <h2 className="not-recognized-title">Product Not Recognized</h2>

          <p className="not-recognized-text">
            Product not recognized by the system.
            <br />
            Please register it or try scanning again.
          </p>

          <div className="not-recognized-buttons">
            <button className="nr-btn nr-primary">Register New Product</button>
            <button className="nr-btn nr-secondary">Try Again</button>
            <button className="nr-btn nr-outline">Cancel</button>
          </div>
        </div>
      </main>

      {/* Footer (standard) */}
      <footer className="std-footer">
        <button className="nav-item">
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item active">
          <span className="nav-icon">📷</span>
          <span className="nav-text">Scan</span>
        </button>

        <button className="nav-item">
          <span className="nav-icon">🕘</span>
          <span className="nav-text">History</span>
        </button>

        <button className="nav-item">
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </button>
      </footer>
    </div>
  );
}
