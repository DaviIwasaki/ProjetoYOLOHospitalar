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
import { FiFilter } from "react-icons/fi";
import { FiDownload } from "react-icons/fi";

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
    plugins: {
      legend: { position: "bottom" },
    },
    scales: {
      y: { beginAtZero: true },
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
    <div className="reports-container">
      {/* Header */}
      <header className="reports-header">
        <div className="header-left">
          <img src={logo} alt="YOLO Hospitalar Logo" className="reports-logo" />
          <h2>Reports</h2>
        </div>
        <button className="export-btn">
          <FiDownload /> Export
        </button>
      </header>

      {/* Filter Section */}
      <section className="filter-section">
        <h3>Report Filters</h3>
        <button className="filter-btn">
          <FiFilter /> Filter
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

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Movement</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.category}</td>
                <td>{t.qty}</td>
                <td>
                  <span
                    className={`movement-tag ${
                      t.movement === "Entry" ? "entry" : "exit"
                    }`}
                  >
                    {t.movement}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button>🏠 Home</button>
        <button>🧾 Reports</button>
        <button>👤 Profile</button>
      </nav>
    </div>
  );
};

export default Reports;
