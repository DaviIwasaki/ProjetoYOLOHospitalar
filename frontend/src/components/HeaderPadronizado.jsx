import React from "react";
import logo from "../assets/yolo-hospitalar-logo.png";

const HeaderPadronizado = ({ backTo = "/dashboard" }) => {
  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 1.2rem",
      backgroundColor: "#ffffff",
      borderBottom: "1px solid #f0f0f0",
      position: "sticky",
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button 
          onClick={() => window.location.href = backTo}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "28px",
            color: "#333"
          }}
        >
          ←
        </button>
        <img src={logo} alt="YOLO Hospitalar" style={{ width: "32px", height: "32px" }} />
        <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#333", margin: 0 }}>
          YOLO Hospitalar
        </h2>
      </div>

      <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "24px" }}>🔔</span>
      </div>
    </header>
  );
};

export default HeaderPadronizado;