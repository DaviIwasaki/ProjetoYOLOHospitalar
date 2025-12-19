import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";
import "../AppLayout.css";
import logo from "../assets/yolo-hospitalar-logo.png";
import { FiSearch, FiSliders } from "react-icons/fi";
import { FaClock } from "react-icons/fa";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchInventory = async (search = "") => {
    setLoading(true);
    try {
      const url = search 
        ? `${window.location.origin}/api/inventory?search=${encodeURIComponent(search)}`
        : `${window.location.origin}/api/inventory`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Erro ao carregar inventário:", err);
      alert("Erro ao carregar dados do servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInventory(searchTerm);
  };

  const goToProductProfile = (productId) => {
    // Busca o produto completo pra passar pro profile
    const product = items.find(item => item.id === productId);
    if (product) {
      localStorage.setItem('currentProduct', JSON.stringify({
        id: product.id,
        nome: product.name,
        codigo_interno: product.sku,
        quantidade_estoque: product.current,
        estoque_minimo: product.ideal
      }));
      window.location.href = "/product-profile";
    }
  };

  return (
    <div className="inventory-container">
      <header className="inventory-header">
        <div className="inventory-header-left">
          <span className="back-arrow" onClick={() => window.location.href = "/dashboard"}>←</span>
          <img src={logo} alt="YOLO Hospitalar Logo" className="inventory-logo" />
          <h2>YOLO Hospitalar</h2>
        </div>
        <div className="inventory-header-icons">
          <span className="icon">🔔</span>
        </div>
      </header>

      <header className="inventory-header">
        <h2>Inventário & Rastreabilidade</h2>
      </header>

      <div className="inventory-search">
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por código ou nome..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button className="filter-btn">
          <FiSliders />
        </button>
      </div>

      <div className="inventory-list">
        {loading ? (
          <p style={{textAlign: "center", padding: "40px"}}>Carregando inventário...</p>
        ) : items.length === 0 ? (
          <p style={{textAlign: "center", padding: "40px"}}>Nenhum produto encontrado</p>
        ) : (
          items.map((item) => (
            <div 
              key={item.id} 
              className="inventory-card"
              onClick={() => goToProductProfile(item.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="inventory-card-header">
                <h3 className="sku">{item.sku}</h3>
                <span className={`status-badge ${item.color}`}>
                  {item.status === "In Stock" ? "Em Estoque" :
                   item.status === "Low Stock" ? "Estoque Baixo" :
                   "Sem Estoque"}
                </span>
              </div>

              <p className="item-name">{item.name}</p>

              <div className="stock-info">
                <p>
                  <strong>Estoque Atual</strong> <br /> 
                  <span style={{fontSize: "20px", fontWeight: "bold"}}>
                    {item.current}
                  </span>
                </p>
                <p>
                  <strong>Estoque Mínimo</strong> <br /> {item.ideal}
                </p>
              </div>

              <p className="last-movement">
                <strong>Última Movimentação</strong> <br /> {item.movement}
              </p>

              <button className="history-btn" onClick={(e) => { e.stopPropagation(); goToProductProfile(item.id); }}>
                <FaClock className="clock-icon" />
                Ver Histórico
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;