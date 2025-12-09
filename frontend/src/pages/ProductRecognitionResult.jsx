import React from "react";
import "../AppLayout.css";
import "../styles/ProductRecognitionResult.css";

const ProductRecognitionResult = () => {
  return (
    // 1. WRAPPER MESTRE 
    <div className="page-wrapper">
      
      {/* 2. HEADER FIXO */}
      <header className="page-header">
        <button className="icon-btn-reset">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="header-title">Product Recognition</h1>
        <div style={{width: 24}}></div> {/* Espaço vazio para centralizar título */}
      </header>

      {/* 3. CONTEÚDO ROLÁVEL (MAIN) */}
      <main className="page-content">
        
        {/* Imagem do Produto com Bounding Box */}
        <div className="recog-image-wrapper">
          {/* Placeholder da imagem (substitua pelo src real) */}
          <img 
            src="src/assets/sample-product.jpg"
            alt="Product Scan" 
            className="recog-image" 
          />
          {/* Caixa azul simulando a detecção da IA */}
          <div className="bounding-box"></div>
        </div>

        {/* Informações do Resultado */}
        <div className="recog-info">
          <h2 className="product-title">Saline Solution 500ml</h2>
          <p className="confidence-text">Confidence: 98.5%</p>
          <p className="success-msg">Product successfully identified!</p>
        </div>

        {/* Botões de Ação */}
        <div className="recog-actions">
          {/* Botão Azul (Primary) */}
          <button className="btn-primary">
            View Details
          </button>

          {/* Botão Branco (Outline) */}
          <button className="btn-outline">
            Register Entry
          </button>

          {/* Botão Branco (Outline) */}
          <button className="btn-outline">
            Register Exit
          </button>
        </div>

      </main>

      {/* 4. FOOTER FIXO */}
      <footer className="fixed-footer">
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="nav-text">Home</span>
        </div>
        
        {/* Item Ativo (Inventory) */}
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            <line x1="6" y1="2" x2="6" y2="4"></line>
            <line x1="14" y1="2" x2="14" y2="4"></line>
          </svg>
          <span className="nav-text">Inventory</span>
        </div>

        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="nav-text">Profile</span>
        </div>

        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span className="nav-text">Settings</span>
        </div>
      </footer>
    </div>
  );
};

export default ProductRecognitionResult;