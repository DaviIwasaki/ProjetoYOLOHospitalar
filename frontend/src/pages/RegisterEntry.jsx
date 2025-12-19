import React, { useState, useEffect } from "react";
import "../styles/RegisterEntry.css";
import logo from "../assets/yolo-hospitalar-logo.png";

export default function RegisterEntry() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    quantity: "",
    date: new Date().toISOString().split("T")[0], // hoje por padrão
    responsibleUser: "",
    origin: "",
    notes: "",
  });

  useEffect(() => {
    const prod = localStorage.getItem("currentProduct");
    if (prod) {
      const parsed = JSON.parse(prod);
      setProduct(parsed);
    } else {
      // Se não tiver produto, volta pro scanner
      window.location.href = "/scanner";
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    if (!product?.id) {
      setError(
        "Produto não identificado automaticamente. Use registro manual."
      );
      setLoading(false);
      return;
    }

    const payload = {
      instrumento_id: product.id,
      quantidade: formData.quantity,
      responsavel: formData.responsibleUser || "Usuário via Scanner",
      origem: formData.origin,
      notas: formData.notes,
      data: formData.date,
    };

    try {
      const response = await fetch(
        `${window.location.origin}/api/movimentacoes/entrada`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erro ao registrar");

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/register-entry-success";
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-entry-page">
      <header className="register-entry-header">
        <div className="register-entry-header-left">
          <img
            src={logo}
            alt="YOLO Hospitalar"
            className="register-entry-logo"
          />
          <span className="register-entry-brand">YOLO Hospitalar</span>
        </div>
        <h1 className="register-entry-title">Registrar Entrada</h1>
      </header>

      <main className="register-entry-main">
        <form className="register-entry-form" onSubmit={handleSubmit}>
          <section className="rei-section">
            <h2 className="rei-section-title">Produto Detectado</h2>
            <div className="rei-label">
              <strong>{product ? product.nome : "Carregando..."}</strong>
              {product?.id ? (
                <p style={{ color: "green", fontSize: "14px" }}>
                  ✓ Produto encontrado no sistema
                </p>
              ) : (
                <p style={{ color: "orange", fontSize: "14px" }}>
                  Modo teste (sem ID real)
                </p>
              )}
            </div>
          </section>

          <section className="rei-section">
            <h2 className="rei-section-title">Detalhes da Entrada</h2>

            <label className="rei-label">
              Quantidade
              <div className="rei-input-wrapper">
                <span className="rei-icon">📦</span>
                <input
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="ex: 10 unidades"
                  className="rei-input"
                  type="number"
                  min="1"
                  required
                />
              </div>
            </label>

            <label className="rei-label">
              Data
              <div className="rei-input-wrapper">
                <span className="rei-icon">📅</span>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="rei-input"
                  type="date"
                  required
                />
              </div>
            </label>

            <label className="rei-label">
              Responsável
              <div className="rei-input-wrapper">
                <span className="rei-icon">👤</span>
                <input
                  name="responsibleUser"
                  value={formData.responsibleUser}
                  onChange={handleChange}
                  placeholder="Nome do responsável"
                  className="rei-input"
                  type="text"
                  required
                />
              </div>
            </label>

            <label className="rei-label">
              Origem (Opcional)
              <div className="rei-input-wrapper">
                <span className="rei-icon">🧾</span>
                <input
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="ex: Compra, Doação"
                  className="rei-input"
                  type="text"
                />
              </div>
            </label>
          </section>

          <section className="rei-section">
            <h2 className="rei-section-title">Observações</h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Detalhes adicionais..."
              className="rei-textarea"
              rows="4"
            />
          </section>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          {success && (
            <p style={{ color: "green", textAlign: "center" }}>
              Entrada registrada com sucesso!
            </p>
          )}

          <button type="submit" className="rei-submit" disabled={loading}>
            {loading ? "Registrando..." : "Confirmar Entrada"}
          </button>
        </form>
      </main>
    </div>
  );
}
