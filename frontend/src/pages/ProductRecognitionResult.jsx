import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../AppLayout.css";
import "../styles/ProductRecognitionResult.css";

const ProductRecognitionResult = () => {
  const navigate = useNavigate();

  const [recognitionData, setRecognitionData] = useState(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Recupera dados do reconhecimento do localStorage
  useEffect(() => {
    const data = localStorage.getItem("recognitionData");

    if (!data) {
      navigate("/scanner");
      return;
    }

    try {
      const parsed = JSON.parse(data);
      setRecognitionData(parsed);
    } catch (err) {
      console.error("Erro ao ler recognitionData:", err);
      navigate("/scanner");
    }
  }, [navigate]);

  // 2️⃣ Busca produto no backend usando a classe YOLO
  useEffect(() => {
    if (!recognitionData) return;

    const { detectedItem } = recognitionData;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `/api/products/by_yolo_class/${encodeURIComponent(
            detectedItem.class
          )}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Produto não encontrado");
        }

        setProduct(data);
      } catch (err) {
        console.warn("Produto não encontrado no banco, usando mock:", err);

        // 🔧 MOCK TEMPORÁRIO (classes COCO)
        setProduct({
          id: null,
          nome: detectedItem.class
            .replace("_", " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          codigo_interno: `TEMP-${detectedItem.class.toUpperCase()}`,
          quantidade_estoque: Math.floor(Math.random() * 20) + 5,
          estoque_minimo: 5,
          descricao:
            "Produto provisório para testes com YOLOv8n padrão (dataset COCO)",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [recognitionData]);

  if (!recognitionData) {
    return null;
  }

  const { detectedItem, capturedImage } = recognitionData;
  const confidence = (detectedItem.confidence * 100).toFixed(1);

  return (
    <div className="page-wrapper">
      {/* HEADER */}
      <header className="page-header">
        <button className="icon-btn-reset" onClick={() => navigate(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#333"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="header-title">Reconhecimento</h1>
        <div style={{ width: 24 }} />
      </header>

      {/* CONTEÚDO */}
      <main className="page-content">
        <div className="recog-image-wrapper">
          <img
            src={capturedImage}
            alt="Imagem capturada"
            className="recog-image"
          />
        </div>

        <div className="recog-info">
          {loading ? (
            <p>Carregando dados do produto...</p>
          ) : (
            <>
              <h2 className="product-title">{product?.nome}</h2>
              <p className="confidence-text">Confiança: {confidence}%</p>
              <p className="success-msg">
                {product?.id
                  ? "Produto identificado com sucesso!"
                  : "Detectado (modo teste)"}
              </p>
            </>
          )}
        </div>

        {/* AÇÕES */}
        <div className="recog-actions">
          <button
            className="btn-primary"
            onClick={() => {
              localStorage.setItem("currentProduct", JSON.stringify(product));
              localStorage.setItem("capturedImageForEntry", capturedImage);
              window.location.href = "/product-profile";
            }}
          >
            Ver Detalhes
          </button>

          <button
            className="btn-outline"
            onClick={() => {
              localStorage.setItem("currentProduct", JSON.stringify(product));
              localStorage.setItem("capturedImageForEntry", capturedImage);
              window.location.href = "/register-entry";
            }}
          >
            Registrar Entrada
          </button>

          <button
            className="btn-outline"
            onClick={() => {
              localStorage.setItem("currentProduct", JSON.stringify(product));
              localStorage.setItem("capturedImageForEntry", capturedImage);
              window.location.href = "/register-exit";
            }}
          >
            Registrar Saída
          </button>
        </div>
      </main>

      {/* FOOTER (mantém o seu atual) */}
      <footer className="fixed-footer">{/* footer */}</footer>
    </div>
  );
};

export default ProductRecognitionResult;
