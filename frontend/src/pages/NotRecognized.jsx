import React from "react";
import "../styles/NotRecognized.css";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

export default function NotRecognized() {
  return (
    <div className="not-recognized-page">
      {/* Header (standard) */}
      <HeaderPadronizado title="Produto Não Reconhecido" />

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
      <FooterPadronizado active="home" />
    </div>
  );
}
