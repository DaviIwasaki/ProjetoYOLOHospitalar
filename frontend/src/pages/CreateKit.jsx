import React, { useState } from "react";
import "../styles/CreateKit.css";

const CreateKit = () => {
  // Estado simulado para a lista de produtos
  const [items] = useState([
    { id: 1, name: "Bisturi Descartável #15", code: "INS-001", qty: 2 },
    { id: 2, name: "Pinça Anatômica 14cm", code: "INS-045", qty: 1 },
    { id: 3, name: "Tesoura Cirúrgica Reta", code: "INS-022", qty: 1 },
  ]);

  return (
    // 1. CONTAINER ESTRUTURAL 
    <div className="kit-wrapper">
      
      {/* 2. HEADER  */}
      <header className="kit-header">
        <button className="back-btn" onClick={() => window.history.back()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="kit-title">Criar Maleta</h1>
      </header>

      {/* 3. CONTEÚDO  */}
      <main className="kit-content">
        
        {/* Card: Detalhes */}
        <section className="kit-section">
          <h3 className="section-title">Detalhes do Kit</h3>
          
          <div className="form-group">
            <label className="form-label">Nome da Maleta</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Ex: Kit Pequena Cirurgia"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Procedimento</label>
            <select className="form-input bg-white">
              <option>Cirurgia Geral</option>
              <option>Ortopedia</option>
              <option>Cardiologia</option>
              <option>Emergência</option>
            </select>
          </div>
        </section>

        {/* Card: Lista de Itens */}
        <section className="kit-list-section">
          <div className="list-header">
            <h3 className="section-title">Itens do Kit ({items.length})</h3>
          </div>

          <div className="items-list">
            {items.map((item) => (
              <div key={item.id} className="kit-item">
                <div className="item-info">
                  <p className="item-name">{item.name}</p>
                  <p className="item-code">Ref: {item.code}</p>
                </div>
                
                {/* Controlador de Quantidade */}
                <div className="qty-control">
                  <button className="qty-btn">−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn">+</button>
                </div>
              </div>
            ))}

            {/* Botão de Adicionar Produto */}
            <button className="add-product-btn">
              <div className="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <span>Adicionar Produto</span>
            </button>
          </div>
        </section>
      </main>

      {/* 4. RODAPÉ DE AÇÃO */}
      <footer className="kit-footer">
        <button className="btn-cancel">Cancelar</button>
        <button className="btn-save">Salvar Maleta</button>
      </footer>
    </div>
  );
};

export default CreateKit;