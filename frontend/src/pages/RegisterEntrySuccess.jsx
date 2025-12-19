import React from "react";
import "../styles/RegisterEntrySuccess.css"; // opcional

export default function RegisterEntrySuccess() {
  return (
    <div className="success-page">
      <h1>✅ Entrada Registrada com Sucesso!</h1>
      <p>O estoque foi atualizado automaticamente.</p>
      <button onClick={() => window.location.href = "/scanner"}>
        Voltar ao Scanner
      </button>
    </div>
  );
}