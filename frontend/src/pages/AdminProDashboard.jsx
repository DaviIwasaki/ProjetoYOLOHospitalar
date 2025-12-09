import React from "react";
import "../styles/AdminProDashboard.css";
import "../AppLayout.css";

function AdminProDashboard() {
  // Dados simulados para o Resumo
  const summaryData = [
    {
      id: 1,
      label: "Users Registered",
      value: "1,234",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      id: 2,
      label: "Pending Reviews",
      value: "78",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      ),
    },
    {
      id: 3,
      label: "Active Alerts",
      value: "3",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2196f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
    },
  ];

  // Dados simulados para a Fila de Revisão
  const reviews = [
    {
      id: 1,
      title: "Eco-Friendly Water Bottle",
      author: "Sarah Johnson",
      date: "2023-10-26",
      status: "Pending",
    },
    {
      id: 2,
      title: "Organic Coffee Beans (Dark Roast)",
      author: "Michael Brown",
      date: "2023-10-25",
      status: "Pending",
    },
    {
      id: 3,
      title: "Minimalist Ergonomic Keyboard",
      author: "Emily Davis",
      date: "2023-10-24",
      status: "Pending",
    },
  ];

  return (
    <div className="admin-container">
      {/* ===== Header ===== */}
      <header className="admin-header">
        <div className="header-brand">
          <div className="logo-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <span className="header-title">Admin</span>
        </div>
        <button className="menu-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <div className="admin-content">
        {/* ===== Dashboard Summary ===== */}
        <section className="summary-section">
          <h2 className="section-title">Dashboard Summary</h2>
          <div className="summary-grid">
            {summaryData.map((item) => (
              <div key={item.id} className="summary-card">
                <div className="summary-icon-wrapper">{item.icon}</div>
                <div className="summary-value">{item.value}</div>
                <div className="summary-label">{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Review Queue ===== */}
        <section className="review-section">
          <h2 className="section-title">Review Queue</h2>
          <div className="review-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3 className="review-title">{review.title}</h3>
                  <span className="status-badge pending">{review.status}</span>
                </div>
                
                <div className="review-meta">
                  <p>Added By: {review.author}</p>
                  <p>Date: {review.date}</p>
                </div>

                <div className="card-divider"></div>

                <div className="review-actions">
                  <button className="btn-action approve">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Approve
                  </button>
                  
                  <button className="btn-action icon-only">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>

                  <button className="btn-action reject">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== Bottom Navigation ===== */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '12px 0',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))', // Proteção para iPhone
          zIndex: 9999
        }}
      >
        {/* Item 1: Users */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#999' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Users</span>
        </div>

        {/* Item 2: Products */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#999' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
             <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
             <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Products</span>
        </div>

        {/* Item 3: Reviews (Ativo - Azul) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#2196f3' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
            <rect x="9" y="3" width="6" height="4" rx="2"></rect>
            <path d="M9 14l2 2 4-4"></path>
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: '600' }}>Reviews</span>
        </div>

        {/* Item 4: Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: '#999' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span style={{ fontSize: '10px', marginTop: '4px' }}>Settings</span>
        </div>
      </nav>
    </div>
  );
}

export default AdminProDashboard;