import React, { useState, useEffect } from "react";
import "../styles/ProductProfile.css";
import { FiArrowLeft } from "react-icons/fi";
import { FaBox, FaTag, FaWarehouse, FaClock, FaUser } from "react-icons/fa";
import sampleProduct from "../assets/sample-product.jpg";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

const ProductProfile = () => {
  const [product, setProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lê o produto do localStorage (vindo de RecognitionResult)
    const prod = localStorage.getItem("currentProduct");
    const img = localStorage.getItem("capturedImageForEntry"); // opcional

    if (prod) {
      const parsed = JSON.parse(prod);
      setProduct(parsed);
      setCapturedImage(img || sampleProduct);

      // Busca detalhes completos + histórico
      if (parsed.id) {
        fetch(`${window.location.origin}/api/products/${parsed.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setProduct(data.product);
              setHistory(data.history);
            }
          })
          .catch((err) => console.error("Erro ao carregar detalhes:", err))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      // Se não tem produto, volta pro scanner
      window.location.href = "/scanner";
    }
  }, []);

  if (loading) {
    return (
      <div className="product-profile-container">
        <p>Carregando produto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-profile-container">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="product-profile-container">
      <HeaderPadronizado title="Perfil do Produto" />

      <main className="product-content">
        <div className="product-card">
          <img
            src={capturedImage || sampleProduct}
            alt="Produto"
            className="product-image"
          />
          <h3 className="product-title">{product.nome}</h3>
          <div className="product-info">
            <p>
              <FaBox className="icon" /> Categoria:{" "}
              <span>{product.categoria}</span>
            </p>
            <p>
              <FaTag className="icon" /> Código:{" "}
              <span>{product.codigo_interno}</span>
            </p>
            <p>
              <FaBox className="icon" /> Estoque Atual:
              <span
                style={{
                  color:
                    product.quantidade_estoque < product.estoque_minimo
                      ? "red"
                      : "green",
                  fontWeight: "bold",
                }}
              >
                {" "}
                {product.quantidade_estoque}
              </span>
            </p>
          </div>
        </div>

        <div className="details-card">
          <h4>Detalhes</h4>
          {product.validade && (
            <p>
              <strong>Validade:</strong> {product.validade}
            </p>
          )}
          <p>
            <FaWarehouse className="icon" /> Estoque Mínimo:{" "}
            {product.estoque_minimo} | Máximo: {product.estoque_maximo}
          </p>
          <p>
            <FaClock className="icon" /> Última atualização: Hoje (via scanner)
          </p>
        </div>

        <div className="history-card">
          <h4>Histórico de Movimentações</h4>
          {history.length === 0 ? (
            <p>Nenhuma movimentação registrada ainda.</p>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Qtd</th>
                  <th>Responsável</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, index) => (
                  <tr key={index}>
                    <td data-label="Data">{h.date}</td>
                    <td data-label="Tipo">
                      <span
                        className={`type-badge ${
                          h.type === "Entry" ? "entry" : "exit"
                        }`}
                      >
                        {h.type === "Entry" ? "Entrada" : "Saída"}
                      </span>
                    </td>
                    <td data-label="Qtd">{h.qty}</td>
                    <td data-label="Responsável">
                      <FaUser className="user-icon" /> {h.user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <button
          className="edit-btn"
          onClick={() => alert("Funcionalidade de edição em desenvolvimento")}
        >
          Editar Produto
        </button>
      </main>
      <FooterPadronizado active="home" />
    </div>
  );
};

export default ProductProfile;
