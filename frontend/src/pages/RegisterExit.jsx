import React, { useState, useEffect } from "react";
import "../styles/RegisterEntry.css"; // reuse o mesmo CSS
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

export default function RegisterExit() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    quantity: "",
    date: new Date().toISOString().split("T")[0],
    responsibleUser: "",
    destination: "",
    notes: "",
  });

  useEffect(() => {
    const prod = localStorage.getItem("currentProduct");
    if (prod) {
      setProduct(JSON.parse(prod));
    } else {
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
      setError("Produto não identificado. Use registro manual.");
      setLoading(false);
      return;
    }

    const payload = {
      instrumento_id: product.id,
      quantidade: formData.quantity,
      responsavel: formData.responsibleUser || "Usuário via Scanner",
      destino: formData.destination,
      notas: formData.notes,
      data: formData.date,
    };

    try {
      const response = await fetch(`${window.location.origin}/api/movimentacoes/saida`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Erro ao registrar");

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/register-exit-success";
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-entry-page">
      <HeaderPadronizado title="Registrar Saída" />

      <main className="register-entry-main">
        <form className="register-entry-form" onSubmit={handleSubmit}>
          <section className="rei-section">
            <h2 className="rei-section-title">Produto Detectado</h2>
            <div className="rei-label">
              <strong>{product ? product.nome : "Carregando..."}</strong>
              {product?.id ? (
                <p style={{ color: "green", fontSize: "14px" }}>✓ Produto encontrado no sistema</p>
              ) : (
                <p style={{ color: "orange", fontSize: "14px" }}>Modo teste (sem ID real)</p>
              )}
            </div>
          </section>

          <section className="rei-section">
            <h2 className="rei-section-title">Detalhes da Saída</h2>

            <label className="rei-label">
              Quantidade
              <div className="rei-input-wrapper">
                <span className="rei-icon">📦</span>
                <input
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="ex: 5 unidades"
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
              Destino (Opcional)
              <div className="rei-input-wrapper">
                <span className="rei-icon">🧾</span>
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="ex: Uso em cirurgia, Transferência"
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

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
          {success && <p style={{ color: "green", textAlign: "center" }}>Saída registrada com sucesso!</p>}

          <button type="submit" className="rei-submit" disabled={loading}>
            {loading ? "Registrando..." : "Confirmar Saída"}
          </button>
        </form>
      </main>
      <FooterPadronizado active="home" />
    </div>
  );
}