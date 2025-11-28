import React from "react";
import "../styles/RegisterEntrySuccess.css";
import { CheckCircle } from "lucide-react";
import logo from "../assets/yolo-hospitalar-logo.png"; // ajuste o caminho se necessário

const RegisterEntrySuccess = () => {
  return (
    <div className="register-entry-page">
      {/* ===== HEADER ===== */}
      <header className="re-header">
        <img src={logo} alt="Che Lusso Logo" className="re-logo" />
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="re-container">
        <CheckCircle className="re-icon" />
        <p className="re-text">Product entry successfully registered.</p>

        <div className="re-buttons">
          <button className="re-btn re-primary">Return to Dashboard</button>
          <button className="re-btn re-outline">Register Another Entry</button>
        </div>
      </main>
    </div>
  );
};

export default RegisterEntrySuccess;
