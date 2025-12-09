import React from "react";
import "../styles/Reports.css"; 
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import logo from "../assets/yolo-hospitalar-logo.png";
// Ícones SVG para os botões e menu
import { FiFilter, FiDownload } from "react-icons/fi"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Entry",
        data: [120, 90, 130, 180, 150],
        backgroundColor: "#4A90E2",
        borderRadius: 6,
      },
      {
        label: "Exit",
        data: [100, 80, 110, 140, 120],
        backgroundColor: "#A8D0F0",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } }
    },
  };

  const transactions = [
    { id: "RPT001", category: "Medication", qty: 250, movement: "Entry" },
    { id: "RPT002", category: "Equipment", qty: 5, movement: "Exit" },
    { id: "RPT003", category: "Supplies", qty: 120, movement: "Entry" },
    { id: "RPT004", category: "Medication", qty: 30, movement: "Exit" },
    { id: "RPT005", category: "Vaccines", qty: 50, movement: "Entry" },
  ];

  return (
    // 1. WRAPPER PRINCIPAL 
    <div className="reports-wrapper">
      
      {/* 2. HEADER FIXO */}
      <header className="reports-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="reports-logo" />
          <h2>Reports</h2>
        </div>
        <button className="export-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Export
        </button>
      </header>

      {/* 3. CONTEÚDO ROLÁVEL  */}
      <main className="reports-content">
        
        {/* Filter Section */}
        <section className="filter-section">
          <h3>Report Filters</h3>
          <button className="filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Filter
          </button>
        </section>

        {/* Chart Section */}
        <section className="chart-section">
          <h3>Product Movement Trends</h3>
          <p>Monthly overview of entries and exits</p>
          <div className="chart-wrapper">
            <Bar data={data} options={options} />
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="transactions-section">
          <h3>Recent Transactions</h3>
          <p>Detailed record of hospital product movements</p>

          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td className="text-muted">{t.id}</td>
                    <td>{t.category}</td>
                    <td>{t.qty}</td>
                    <td>
                      <span className={`movement-tag ${t.movement.toLowerCase()}`}>
                        {t.movement}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 4. FOOTER FIXO  */}
      <footer className="reports-footer">
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="nav-text">Home</span>
        </div>
        <div className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span className="nav-text">Reports</span>
        </div>
        <div className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="nav-text">Profile</span>
        </div>
      </footer>
    </div>
  );
};

export default Reports;