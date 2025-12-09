import React from "react";
import "../styles/Scanner.css";
import scanImage from "../assets/scan-preview.png"; 
import logo from "../assets/yolo-hospitalar-logo.png";

const Scanner = () => {
  return (
    <div className="scanner-container">
      
      {/*  TOPO */}
      <header className="scanner-header">
        <div className="scanner-header-left">
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <img src={logo} alt="Logo" className="scanner-logo" />
          <h2>YOLO Hospitalar</h2>
        </div>
        <div className="scanner-header-right">
          <button className="icon-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="scanner-content">
        
        <div className="camera-section">
          <div className="scanner-frame">
            <img src={scanImage} alt="Preview" className="scan-img" />
            <div className="scan-overlay">
              <div className="scan-line"></div>
            </div>
          </div>
          <button className="scanner-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            Start Scanning
          </button>
        </div>

        <section className="results-section">
          <h3 className="section-title">Detected Products</h3>
          <div className="product-list">
            <div className="product-item">
              <div className="product-info">
                <p className="product-name">YOLO Hand Sanitizer</p>
                <p className="product-id">YH-2023-ABC</p>
              </div>
              <div className="product-action">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>

            <div className="product-item">
              <div className="product-info">
                <p className="product-name">Unknown Item</p>
                <p className="product-id">SG-456-XYZ</p>
              </div>
              <div className="product-action">
                <span className="badge-error">Unrecognized</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* RODAPÉ  */}
      <footer className="bottom-nav">
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <p className="nav-text">Home</p>
        </div>
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle>
          </svg>
          <p className="nav-text">Scan</p>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <p className="nav-text">History</p>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
          <p className="nav-text">Profile</p>
        </div>
      </footer>
    </div>
  );
};

export default Scanner;