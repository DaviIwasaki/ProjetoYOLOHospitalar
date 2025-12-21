import React, { useState, useEffect } from "react";
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
import FooterPadronizado from "../components/FooterPadronizado";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [chartData, setChartData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${window.location.origin}/api/reports/movement`);
        const data = await response.json();

        if (!data.success) throw new Error(data.message || "Erro ao carregar relatório");

        // Configura gráfico
        setChartData({
          labels: data.chart.labels,
          datasets: [
            {
              label: "Entradas",
              data: data.chart.entries,
              backgroundColor: "#4A90E2",
              borderRadius: 6,
            },
            {
              label: "Saídas",
              data: data.chart.exits,
              backgroundColor: "#A8D0F0",
              borderRadius: 6,
            },
          ],
        });

        setTransactions(data.transactions);
      } catch (err) {
        setError("Erro ao carregar dados do relatório: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="reports-wrapper">
      <header className="reports-header">
        <div className="header-left">
          <img src={logo} alt="Logo" className="reports-logo" />
          <h2>Relatórios</h2>
        </div>
        <button className="export-btn" onClick={() => alert("Exportar em PDF/Excel - em desenvolvimento")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Exportar
        </button>
      </header>

      <main className="reports-content">
        <section className="filter-section">
          <h3>Filtros do Relatório</h3>
          <button className="filter-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 6}}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            Aplicar Filtro
          </button>
        </section>

        <section className="chart-section">
          <h3>Tendências de Movimentação</h3>
          <p>Visão mensal de entradas e saídas (últimos 12 meses)</p>
          <div className="chart-wrapper">
            {loading ? (
              <p>Carregando gráfico...</p>
            ) : error ? (
              <p style={{color: "red"}}>{error}</p>
            ) : chartData ? (
              <Bar data={chartData} options={options} />
            ) : (
              <p>Sem dados de movimentação ainda</p>
            )}
          </div>
        </section>

        <section className="transactions-section">
          <h3>Transações Recentes</h3>
          <p>Registro detalhado das últimas movimentações</p>

          <div className="table-responsive">
            {loading ? (
              <p>Carregando transações...</p>
            ) : transactions.length === 0 ? (
              <p>Nenhuma transação registrada ainda</p>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Categoria</th>
                    <th>Qtd</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Responsável</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td className="text-muted">{t.id}</td>
                      <td>{t.product}</td>
                      <td>{t.category}</td>
                      <td>{t.qty}</td>
                      <td>
                        <span className={`movement-tag ${t.movement.toLowerCase()}`}>
                          {t.movement === "Entry" ? "Entrada" : "Saída"}
                        </span>
                      </td>
                      <td>{t.date}</td>
                      <td>{t.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      <FooterPadronizado active="home" />
    </div>
  );
};

export default Reports;