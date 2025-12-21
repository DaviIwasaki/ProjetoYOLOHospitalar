import React, { useState, useEffect } from "react";
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
import logo from "../assets/yolo-hospitalar-logo.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [summary, setSummary] = useState({
    total_itens: 0,
    low_stock: 0,
    total_maletas: 0,
    categories: { labels: [], data: [] },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${window.location.origin}/api/dashboard/summary`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSummary(data);
        }
      })
      .catch(() => {
        // Dados mock se erro
        setSummary({
          total_itens: 860,
          low_stock: 125,
          total_maletas: 12,
          categories: {
            labels: ["Pharma", "Sanit.", "Equip.", "Supplies"],
            data: [460, 280, 120, 80],
          },
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = {
    labels: summary.categories.labels,
    datasets: [
      {
        label: "Itens em Estoque",
        data: summary.categories.data,
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
        grid: { color: "#f0f0f0" },
      },
      x: { grid: { display: false } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="logo-section">
          <img src={logo} alt="YOLO" className="dashboard-logo" />
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
        <div className="user-section">
          <div
            className="profile-icon"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#007bff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            D
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Status Cards */}
        <section className="status-section">
          <div className="status-card blue">
            <div className="card-content">
              <h2 className="status-value">
                {loading ? "..." : summary.total_itens.toLocaleString()}
              </h2>
              <p className="status-label">Itens em Estoque</p>
            </div>
          </div>

          <div className="status-card yellow">
            <div className="card-content">
              <h2 className="status-value">
                {loading ? "..." : summary.low_stock}
              </h2>
              <p className="status-label">Categorias Estoque Baixo</p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="actions-section">
          {/* Scanner */}
          <div
            className="action-card"
            onClick={() => (window.location.href = "/scanner")}
          >
            <div className="icon-wrapper blue">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <p className="action-text">Scanner</p>
          </div>

          {/* Maletas */}
          <div
            className="action-card"
            onClick={() => (window.location.href = "/maletas-list")}
          >
            <div className="icon-wrapper purple">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
                <line x1="6" y1="2" x2="6" y2="4"></line>
                <line x1="14" y1="2" x2="14" y2="4"></line>
                <path d="M10 9h4"></path>
                <line x1="12" y1="7" x2="12" y2="11"></line>
              </svg>
            </div>
            <p className="action-text">Maletas</p>
          </div>

          {/* Inventário */}
          <div
            className="action-card"
            onClick={() => (window.location.href = "/inventory")}
          >
            <div className="icon-wrapper green">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M9 10h6"></path>
              </svg>
            </div>
            <p className="action-text">Inventário</p>
          </div>

          {/* Relatórios */}
          <div
            className="action-card"
            onClick={() => (window.location.href = "/reports")}
          >
            <div className="icon-wrapper orange">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <p className="action-text">Relatórios</p>
          </div>
        </section>

        {/* Gráfico */}
        <section className="chart-section">
          <h3 className="chart-title">Estoque por Categoria</h3>
          <div className="chart-wrapper">
            {loading ? (
              <p style={{ textAlign: "center", padding: "40px" }}>
                Carregando dados...
              </p>
            ) : (
              <Bar data={chartData} options={options} />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bottom-nav">
        <div className="nav-item active">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span className="nav-text">Home</span>
        </div>

        <div
          className="nav-item"
          onClick={() => (window.location.href = "/inventory")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
          </svg>
          <span className="nav-text">Estoque</span>
        </div>

        <div
          className="nav-item"
          onClick={() => (window.location.href = "/reports")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          <span className="nav-text">Dados</span>
        </div>

        <div className="nav-item">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span className="nav-text">Perfil</span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
