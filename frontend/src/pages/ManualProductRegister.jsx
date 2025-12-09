import React from "react";
import "../styles/ManualProductRegister.css";

function ManualProductRegister() {
  return (
    <div className="mobile-container">
      {/* ===== Header ===== */}
      <header className="page-header">
        <button className="icon-btn-header back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="header-title">Product Registration</h1>
        <div className="header-spacer"></div> {/* Espaço vazio para equilibrar o layout */}
      </header>

      {/* ===== Content Scroll ===== */}
      <div className="content-scroll form-content">
        
        {/* Section: Product Details */}
        <section className="form-section">
          <h2 className="section-heading">Product Details</h2>
          
          <div className="form-group">
            <label className="form-label">Product Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Ex: Sterile Gauze Pads"
              defaultValue="Sterile Gauze Pads 4x4" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Select Category"
              defaultValue="Medical Consumables" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Batch Number</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Batch ID"
              defaultValue="SGP-4X4-BX-2023-01A" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Quantity</label>
            <input 
              type="number" 
              className="form-input" 
              placeholder="0"
              defaultValue="250" 
            />
          </div>
        </section>

        {/* Section: Logistics Information */}
        <section className="form-section">
          <h2 className="section-heading">Logistics Information</h2>
          
          <div className="form-group">
            <label className="form-label">Supplier</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="Global Medical Solutions" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Expiration Date</label>
            <input 
              type="date" 
              className="form-input" 
              defaultValue="2025-12-31" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Storage Location</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="Main Warehouse, Section C-2" 
            />
          </div>
        </section>

        {/* Section: Upload Image */}
        <section className="upload-section">
          <label className="form-label">Product Image (Optional)</label>
          <div className="upload-box">
            <div className="upload-content">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="upload-icon">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <span className="upload-text">Tap to upload product image</span>
            </div>
          </div>
        </section>

        <p className="disclaimer-text">
          Please verify that this product does not already exist in the system.
        </p>

      </div>

      {/* ===== Footer Actions ===== */}
      <footer className="footer-actions">
        <button className="btn-footer cancel">Cancel</button>
        <button className="btn-footer save">Save Product</button>
      </footer>
    </div>
  );
}

export default ManualProductRegister;