import React from "react";
import "../styles/Dashboard.css"; 
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registro do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  // Dados do Gráfico
  const data = {
    labels: ["Pharma", "Sanit.", "Equip.", "Supplies"],
    datasets: [
      {
        label: "Items",
        data: [460, 280, 120, 80],
        backgroundColor: "#007bff",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 100 }, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } }
    },
    plugins: { legend: { display: false } },
  };

  return (
    // 1. WRAPPER PRINCIPAL 
    <div className="dashboard-wrapper">
      
      {/* 2. HEADER  */}
      <header className="dashboard-header">
        <div className="logo-section">
          <img 
            src="/src/assets/yolo-hospitalar-logo.png" 
            alt="YOLO" 
            className="dashboard-logo" 
          />
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="user-section">
          <img 
            src="/src/assets/profile-icon.png" 
            alt="Profile" 
            className="profile-icon" 
          />
        </div>
      </header>

      {/* 3. CONTEÚDO ROLÁVEL (Apenas esta área se move) */}
      <main className="dashboard-content">
        
        {/* Status Cards */}
        <section className="status-section">
          <div className="status-card blue">
            <h2 className="status-value">860</h2>
            <p className="status-label">In Stock</p>
            <span className="status-sub">Stable</span>
          </div>
          <div className="status-card yellow">
            <h2 className="status-value">125</h2>
            <p className="status-label">Low Stock</p>
            <span className="status-sub">Increasing</span>
          </div>
        </section>

        {/* Quick Actions (Atualizado com Maleta Cirúrgica) */}
        <section className="actions-section">
          
          {/* Botão 1: Entrada */}
          <div className="action-card">
            <div className="icon-wrapper green">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </div>
            <p className="action-text">New Entry</p>
          </div>

          {/* Botão 2: Saída */}
          <div className="action-card">
            <div className="icon-wrapper red">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
            <p className="action-text">New Exit</p>
          </div>

          {/* ===> NOVO BOTÃO: MALETA CIRÚRGICA (New Kit) <=== */}
          {/* Adicione o onClick para navegar para /create-kit */}
          <div className="action-card">
            <div className="icon-wrapper purple">
               {/* Ícone de Maleta Médica */}
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                 <line x1="6" y1="2" x2="6" y2="4"></line>
                 <line x1="14" y1="2" x2="14" y2="4"></line>
                 <path d="M10 9h4"></path>
                 <line x1="12" y1="7" x2="12" y2="11"></line>
               </svg>
            </div>
            <p className="action-text">New Kit</p>
          </div>

          {/* Botão 4: Relatórios */}
          <div className="action-card">
            <div className="icon-wrapper blue">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <p className="action-text">Reports</p>
          </div>

        </section>

        {/* Chart Section */}
        <section className="chart-section">
          <h3 className="chart-title">Stock Overview</h3>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </section>
      </main>

      {/* 4. FOOTER */}
      <footer className="bottom-nav">
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="nav-text">Home</span>
        </div>

        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
             <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="nav-text">Stock</span>
        </div>

        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span className="nav-text">Data</span>
        </div>

        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="nav-text">Profile</span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;