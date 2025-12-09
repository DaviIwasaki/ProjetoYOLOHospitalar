import React from "react";
import "../styles/EditProduct.css";

function EditProduct() {
  return (
    <div className="mobile-container">
      {/* ===== Header ===== */}
      <header className="page-header">
        <button className="icon-btn-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        
        <div className="header-title-wrapper">
          <img 
            src="https://via.placeholder.com/40" // Placeholder para simular a seringa pequena
            alt="Product Icon" 
            className="header-thumb"
          />
          <h1 className="header-title">Syringe - 10ml, Sterile</h1>
        </div>

        <button className="icon-btn-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
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
              defaultValue="Syringe - 10ml, Sterile" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="Medical Consumables" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ideal Stock Quantity</label>
            <input 
              type="number" 
              className="form-input" 
              defaultValue="500" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Storage Location</label>
            <input 
              type="text" 
              className="form-input" 
              defaultValue="Warehouse A, Shelf 3B" 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Notes</label>
            <textarea 
              className="form-textarea" 
              defaultValue="Critical item, check expiry quarterly."
              rows="3"
            ></textarea>
          </div>
        </section>

        {/* Section: Inventory Information */}
        <section className="form-section info-section">
          <h2 className="section-heading">Inventory Information</h2>
          
          <div className="info-row border-bottom">
            <span className="info-label">Product ID</span>
            <span className="info-value">INV-SYR-001</span>
          </div>
          
          <div className="info-row border-bottom">
            <span className="info-label">Date Added</span>
            <span className="info-value">2023-01-15</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Total Quantity In Stock</span>
            <span className="info-value bold-dark">485</span>
          </div>

          {/* Image Update Area */}
          <div className="image-update-area">
            <div className="image-preview-box">
              <img 
                src="https://via.placeholder.com/80" // Placeholder da seringa maior
                alt="Product Preview" 
                className="image-preview"
              />
            </div>
            <button className="btn-upload">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              Update Product Image
            </button>
          </div>
        </section>
      </div>

      {/* ===== Bottom Actions Footer ===== */}
      <footer className="footer-actions">
        <button className="btn-footer cancel">Cancel</button>
        <button className="btn-footer save">Save Changes</button>
      </footer>
    </div>
  );
}

export default EditProduct;