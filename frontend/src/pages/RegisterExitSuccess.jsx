import React from "react";

export default function RegisterExitSuccess() {
  return (
    <div className="success-page">
      <h1>✅ Saída Registrada com Sucesso!</h1>
      <p>O estoque foi atualizado automaticamente.</p>
      <button onClick={() => window.location.href = "/scanner"}>
        Voltar ao Scanner
      </button>
    </div>
  );
}