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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  // Dados simulados do gráfico
  const data = {
    labels: ["Pharmaceuticals", "Sanitation", "Equipment", "Supplies"],
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
      y: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="dashboard-wrapper">
      {/* ===== Header ===== */}
      <header className="dashboard-header">
        <div className="logo-section">
          <img
            src="/src/assets/yolo-hospitalar-logo.png"
            alt="YOLO Hospitalar Logo"
            className="dashboard-logo"
          />
          <h1 className="dashboard-title">Inventory Dashboard</h1>
        </div>

        <div className="user-section">
          <img
            src="/src/assets/profile-icon.png"
            alt="Profile"
            className="profile-icon"
          />
        </div>
      </header>

      {/* ===== Status Cards ===== */}
      <section className="status-section">
        <div className="status-card blue">
          <h2 className="status-value">860</h2>
          <p className="status-label">Items in Stock</p>
          <span className="status-sub">Stable</span>
        </div>
        <div className="status-card yellow">
          <h2 className="status-value">125</h2>
          <p className="status-label">Below Ideal</p>
          <span className="status-sub">Increasing</span>
        </div>
      </section>

      {/* ===== Quick Actions ===== */}
      <section className="actions-section">
        <div className="action-card green">
          <span className="action-icon">＋</span>
          <p className="action-text">New Entry</p>
        </div>
        <div className="action-card red">
          <span className="action-icon">➜</span>
          <p className="action-text">New Exit</p>
        </div>
        <div className="action-card gray">
          <span className="action-icon">🔍</span>
          <p className="action-text">Identify Product</p>
        </div>
        <div className="action-card white">
          <span className="action-icon">📊</span>
          <p className="action-text">Reports</p>
        </div>
      </section>

      {/* ===== Stock Chart ===== */}
      <section className="chart-section">
        <h3 className="chart-title">Stock Levels by Category</h3>
        <div className="chart-container">
          <h4 className="chart-subtitle">Current Stock Distribution</h4>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </div>
      </section>

      {/* ===== Bottom Navigation ===== */}
      <footer className="bottom-nav">
        <div className="nav-item active">
          <span className="nav-icon">🏠</span>
          <p className="nav-text">Home</p>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📦</span>
          <p className="nav-text">Inventory</p>
        </div>
        <div className="nav-item">
          <span className="nav-icon">📈</span>
          <p className="nav-text">Analytics</p>
        </div>
        <div className="nav-item">
          <span className="nav-icon">👤</span>
          <p className="nav-text">Profile</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
