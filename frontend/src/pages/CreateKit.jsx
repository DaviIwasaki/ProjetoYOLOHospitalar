import React, { useState, useEffect } from "react";
import "../styles/CreateKit.css";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

const CreateKit = () => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("Cirurgia Geral");
  const [itens, setItens] = useState([]); // {id, nome, code, qty}
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Busca instrumentos
  useEffect(() => {
    if (search.length < 2) {
      setSuggestions([]);
      return;
    }
    fetch(`${window.location.origin}/api/instrumentos/select?search=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
      .catch(() => setSuggestions([]));
  }, [search]);

  const adicionarItem = (inst) => {
    const existente = itens.find(i => i.id === inst.id);
    if (existente) {
      setItens(itens.map(i => i.id === inst.id ? {...i, qty: i.qty + 1} : i));
    } else {
      setItens([...itens, {id: inst.id, nome: inst.nome, code: inst.codigo, qty: 1}]);
    }
    setSearch("");
    setSuggestions([]);
  };

  const ajustarQty = (id, delta) => {
    setItens(itens.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta;
        return newQty > 0 ? {...i, qty: newQty} : null;
      }
      return i;
    }).filter(Boolean));
  };

  const removerItem = (id) => {
    setItens(itens.filter(i => i.id !== id));
  };

  const salvarMaleta = async () => {
    if (!nome.trim()) {
      setMessage("Nome da maleta obrigatório");
      return;
    }
    if (itens.length === 0) {
      setMessage("Adicione pelo menos um item");
      return;
    }

    setSaving(true);
    setMessage("");

    const payload = {
      nome: nome.trim(),
      descricao: `Maleta para ${tipo}`,
      composicao: itens.map(i => ({
        instrumento_id: i.id,
        quantidade_ideal: i.qty
      }))
    };

    try {
      const res = await fetch(`${window.location.origin}/api/maletas`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Maleta criada com sucesso!");
        setTimeout(() => window.location.href = "/dashboard", 2000); // ou /maletas-list
      } else {
        setMessage(data.message || "Erro ao salvar");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="kit-wrapper">
      <HeaderPadronizado title="Criar Maleta" />

      <main className="kit-content">
        <section className="kit-section">
          <h3 className="section-title">Detalhes do Kit</h3>
          
          <div className="form-group">
            <label className="form-label">Nome da Maleta</label>
            <input 
              type="text" 
              className="form-input"
              placeholder="Ex: Kit Pequena Cirurgia"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Procedimento</label>
            <select className="form-input bg-white" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option>Cirurgia Geral</option>
              <option>Ortopedia</option>
              <option>Cardiologia</option>
              <option>Emergência</option>
              <option>Teste YOLO (Cell Phone + Laptop)</option>
            </select>
          </div>
        </section>

        <section className="kit-list-section">
          <div className="list-header">
            <h3 className="section-title">Itens do Kit ({itens.length})</h3>
            <div className="search-add">
              <input
                type="text"
                placeholder="Buscar produto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input-small"
              />
              {suggestions.length > 0 && (
                <div className="suggestions">
                  {suggestions.map(s => (
                    <div key={s.id} className="suggestion-item" onClick={() => adicionarItem(s)}>
                      {s.nome} ({s.codigo})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="items-list">
            {itens.length === 0 ? (
              <p style={{textAlign: "center", color: "#999", padding: "20px"}}>
                Nenhum item adicionado ainda
              </p>
            ) : (
              itens.map((item) => (
                <div key={item.id} className="kit-item">
                  <div className="item-info">
                    <p className="item-name">{item.nome}</p>
                    <p className="item-code">Ref: {item.code}</p>
                  </div>
                  
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => ajustarQty(item.id, -1)}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" onClick={() => ajustarQty(item.id, 1)}>+</button>
                    <button className="remove-btn" onClick={() => removerItem(item.id)}>×</button>
                  </div>
                </div>
              ))
            )}

            <div className="add-hint">
              Digite para buscar e adicionar itens (ex: "cell", "laptop", "person")
            </div>
          </div>
        </section>
      </main>

      <footer className="kit-footer">
        <button className="btn-cancel" onClick={() => window.location.href = "/dashboard"}>
          Cancelar
        </button>
        <button className="btn-save" onClick={salvarMaleta} disabled={saving}>
          {saving ? "Salvando..." : "Salvar Maleta"}
        </button>
      </footer>

      {message && <div className="message-overlay">{message}</div>}
    </div>
  );
};

export default CreateKit;