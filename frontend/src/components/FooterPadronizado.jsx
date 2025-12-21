import React from "react";

const FooterPadronizado = ({ active = "home" }) => {
  const navItems = [
    { name: "home", label: "Home", path: "/dashboard", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
    )},
    { name: "inventory", label: "Estoque", path: "/inventory", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
      </svg>
    )},
    { name: "maletas", label: "Maletas", path: "/maletas-list", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
        <path d="M10 9h4"></path>
        <line x1="12" y1="7" x2="12" y2="11"></line>
      </svg>
    )},
    { name: "reports", label: "Relatórios", path: "/reports", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    )},
  ];

  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-around",
      padding: "0.8rem 0",
      backgroundColor: "#ffffff",
      borderTop: "1px solid #eef2f6",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100
    }}>
      {navItems.map(item => (
        <div 
          key={item.name}
          className="nav-item"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: active === item.name ? "#007bff" : "#999",
            cursor: "pointer",
            flex: 1
          }}
          onClick={() => window.location.href = item.path}
        >
          {item.icon}
          <span style={{ marginTop: "4px", fontSize: "0.75rem", fontWeight: active === item.name ? "600" : "500" }}>
            {item.label}
          </span>
        </div>
      ))}
    </footer>
  );
};

export default FooterPadronizado;