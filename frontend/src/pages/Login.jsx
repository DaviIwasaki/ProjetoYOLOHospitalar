import React from "react";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Logo e título */}
        <div className="login-header">
          <img
            src="/src/assets/yolo-hospitalar-logo.png"
            alt="YOLO Hospitalar Logo"
            className="login-logo"
          />
          <h1 className="login-title">YOLO Hospitalar</h1>
          <p className="login-subtitle">Your care, our priority!</p>
        </div>

        {/* Formulário */}
        <form className="login-form">
          <label htmlFor="email" className="login-label">
            Email or user
          </label>
          <input
            type="text"
            id="email"
            placeholder="Your email or username"
            className="login-input"
          />

          <label htmlFor="password" className="login-label">
            Senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            className="login-input"
          />

          <div className="forgot-container">
            <a href="#" className="forgot-link">
              Forgot your password?
            </a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
