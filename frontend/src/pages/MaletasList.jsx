import React, { useState, useEffect } from "react";
import "../styles/CreateKit.css"; // Reusa o estilo do CreateKit pra ficar lindo

const MaletasList = () => {
  const [maletas, setMaletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [montando, setMontando] = useState(null); // ID da maleta sendo montada
  const [maletaSelecionada, setMaletaSelecionada] = useState(null); // Para modal de detalhes
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMaletas();
  }, []);

  const fetchMaletas = async () => {
    try {
      const res = await fetch(`${window.location.origin}/api/maletas`);
      const data = await res.json();
      setMaletas(data || []);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Erro ao carregar maletas");
    } finally {
      setLoading(false);
    }
  };

  const montarMaleta = async (maleta) => {
    const responsavel = prompt("Nome do responsável pela montagem:");
    if (!responsavel?.trim()) {
      alert("Responsável obrigatório");
      return;
    }

    if (!window.confirm(`Montar maleta "${maleta.nome}"?\nIsso removerá os itens do estoque geral.`)) {
      return;
    }

    setMontando(maleta.id);
    setMessage("");

    try {
      const res = await fetch(`${window.location.origin}/api/maletas/montar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          maleta_id: maleta.id,
          responsavel: responsavel.trim(),
          notas: "Montagem via sistema"
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        fetchMaletas(); // atualiza a lista (opcional)
      } else {
        setMessage("Erro: " + data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Erro de conexão ao montar maleta");
    } finally {
      setMontando(null);
    }
  };

  return (
    <div className="kit-wrapper">
      {/* Header */}
      <header className="kit-header">
        <button className="back-btn" onClick={() => window.location.href = "/dashboard"}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="kit-title">Maletas Cirúrgicas</h1>
      </header>

      <main className="kit-content">
        {/* Botão Criar Nova */}
        <section className="kit-section" style={{ textAlign: "center", marginBottom: "20px" }}>
          <button 
            className="btn-save" 
            style={{ width: "80%", padding: "14px", fontSize: "18px" }}
            onClick={() => window.location.href = "/create-kit"}
          >
            + Criar Nova Maleta
          </button>
        </section>

        {/* Lista de Maletas */}
        <section className="kit-list-section">
          <div className="list-header">
            <h3 className="section-title">Templates Disponíveis ({maletas.length})</h3>
          </div>

          <div className="items-list">
            {loading ? (
              <p style={{textAlign: "center", padding: "40px"}}>Carregando maletas...</p>
            ) : maletas.length === 0 ? (
              <p style={{textAlign: "center", color: "#999", padding: "40px"}}>
                Nenhuma maleta criada ainda.<br />
                Clique acima para criar a primeira!
              </p>
            ) : (
              maletas.map((maleta) => (
                <div key={maleta.id} className="kit-item" style={{ alignItems: "flex-start", padding: "16px" }}>
                  <div className="item-info" style={{ flex: 1 }}>
                    <p className="item-name">{maleta.nome}</p>
                    <p className="item-code">Código: {maleta.codigo_maleta}</p>
                    <p style={{ fontSize: "14px", color: "#666", marginTop: "8px" }}>
                      {maleta.composicao.length} item{maleta.composicao.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      className="btn-primary"
                      style={{ padding: "8px 12px", fontSize: "14px", background: "#007bff" }}
                      onClick={() => setMaletaSelecionada(maleta)}
                    >
                      Ver Detalhes
                    </button>

                    <button
                      className="btn-save"
                      style={{ padding: "8px 12px", fontSize: "14px" }}
                      onClick={() => montarMaleta(maleta)}
                      disabled={montando === maleta.id}
                    >
                      {montando === maleta.id ? "Montando..." : "Montar Maleta"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Modal de Detalhes */}
      {maletaSelecionada && (
        <div 
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }} 
          onClick={() => setMaletaSelecionada(null)}
        >
          <div 
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              maxWidth: "90%",
              maxHeight: "90%",
              overflowY: "auto"
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>{maletaSelecionada.nome}</h2>
            <p><strong>Código:</strong> {maletaSelecionada.codigo_maleta}</p>
            <p><strong>Descrição:</strong> {maletaSelecionada.descricao || "Sem descrição"}</p>

            <h3 style={{ margin: "20px 0 10px" }}>
              Composição Ideal ({maletaSelecionada.composicao.length} itens)
            </h3>
            <div className="items-list">
              {maletaSelecionada.composicao.map((item) => (
                <div key={item.instrumento_id} className="kit-item" style={{ marginBottom: "12px" }}>
                  <div className="item-info">
                    <p className="item-name">{item.nome}</p>
                    <p className="item-code">Ref: {item.codigo}</p>
                  </div>
                  <div className="qty-value" style={{ fontWeight: "bold", fontSize: "18px" }}>
                    {item.quantidade_ideal} unidade{item.quantidade_ideal !== 1 ? "s" : ""}
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="btn-cancel" 
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => setMaletaSelecionada(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* Mensagem flutuante */}
      {message && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: message.includes("sucesso") || message.includes("montada") ? "#4CAF50" : "#f44336",
          color: "white",
          padding: "16px 24px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default MaletasList;