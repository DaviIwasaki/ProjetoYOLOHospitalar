import React from "react";
import "../styles/SuccessPage.css";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

export default function RegisterEntrySuccess() {
  return (
    <div className="success-page">
      <HeaderPadronizado title="Entrada Registrada com Sucesso!" />
      <h1>✅ Entrada Registrada com Sucesso!</h1>
      <p>O estoque foi atualizado automaticamente.</p>
      <button onClick={() => window.location.href = "/scanner"}>
        Voltar ao Scanner
      </button>
      <FooterPadronizado active="home" />
    </div>
  );
}