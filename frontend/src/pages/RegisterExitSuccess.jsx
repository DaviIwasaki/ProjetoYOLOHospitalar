import React from "react";
import "../styles/RegisterExitSuccess.css";
import logo from "../assets/yolo-hospitalar-logo.png";
import { CheckCircle } from "lucide-react";

export default function RegisterExitSuccess() {
  return (
    <div className="register-exit-page">
      {/* Header */}
      <header className="re-header">
        <img src={logo} alt="YOLO Hospitalar" className="re-logo" />
      </header>

      {/* Main content */}
      <main className="re-container">
        <CheckCircle className="re-icon" />
        <h2 className="re-text">
          Product shipment successfully registered.
        </h2>

        <div className="re-buttons">
          <button className="re-btn re-primary">Return to Dashboard</button>
          <button className="re-btn re-outline">Register Another Exit</button>
        </div>
      </main>
    </div>
  );
}
