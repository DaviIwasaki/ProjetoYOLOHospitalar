import React from "react";
import "../styles/Scanner.css";
import scanImage from "../assets/scan-preview.png"; // imagem da câmera escaneando
import logo from "../assets/yolo-hospitalar-logo.png";

const Scanner = () => {
  return (
    <div className="scanner-container">
      <header className="scanner-header">
        <div className="scanner-header-left">
          <span className="back-arrow">←</span>
          <img src={logo} alt="YOLO Hospitalar Logo" className="scanner-logo" />
          <h2>YOLO Hospitalar</h2>
        </div>
        <div className="scanner-header-icons">
          <span className="icon">🔔</span>
        </div>
      </header>

      <main className="scanner-main">
        <div className="scanner-preview">
          <img src={scanImage} alt="Scanning Preview" />
        </div>

        <button className="scanner-btn">⚙️ Start Scanning</button>

        <section className="scanner-products">
          <h3>Detected Products</h3>
          <div className="product-item">
            <div className="product-info">
              <p className="product-name">YOLO Hand Sanitizer</p>
              <p className="product-id">YH-2023-ABC</p>
            </div>
            <span className="product-arrow">›</span>
          </div>

          <div className="product-item">
            <div className="product-info">
              <p className="product-name">Sterile Gauze Pads</p>
              <p className="product-id">SG-456-XYZ</p>
            </div>
            <span className="unrecognized-badge">Unrecognized</span>
            <span className="product-arrow">›</span>
          </div>

          <div className="product-item">
            <div className="product-info">
              <p className="product-name">Disposable Syringe 5ml</p>
              <p className="product-id">DS-987-DEF</p>
            </div>
            <span className="product-arrow">›</span>
          </div>
        </section>
      </main>

      <footer className="scanner-footer">
        <div className="footer-item active">
          <span>🏠</span>
          <p>Home</p>
        </div>
        <div className="footer-item">
          <span>📷</span>
          <p>Scan</p>
        </div>
        <div className="footer-item">
          <span>📜</span>
          <p>History</p>
        </div>
        <div className="footer-item">
          <span>👤</span>
          <p>Profile</p>
        </div>
      </footer>
    </div>
  );
};

export default Scanner;
