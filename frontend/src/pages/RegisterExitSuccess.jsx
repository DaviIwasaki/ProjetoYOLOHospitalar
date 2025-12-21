import React from "react";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

export default function RegisterExitSuccess() {
  return (
    <div className="success-page">
      <HeaderPadronizado title="Saída Registrada com Sucesso!" />
      <h1>✅ Saída Registrada com Sucesso!</h1>
      <p>O estoque foi atualizado automaticamente.</p>
      <button onClick={() => window.location.href = "/scanner"}>
        Voltar ao Scanner
      </button>
      <FooterPadronizado active="home" />
    </div>
  );
}