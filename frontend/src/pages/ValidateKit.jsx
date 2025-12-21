import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/ValidateKit.css";
import scanImage from "../assets/scan-preview.png";
import HeaderPadronizado from "../components/HeaderPadronizado";
import FooterPadronizado from "../components/FooterPadronizado";

const ValidateKit = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  const [maletas, setMaletas] = useState([]);
  const [maletaSelecionada, setMaletaSelecionada] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [detectedItems, setDetectedItems] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Selecione uma maleta para validar"
  );
  const [comparacao, setComparacao] = useState(null);
  const [responsavel, setResponsavel] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Carrega maletas
  useEffect(() => {
    fetch(`${window.location.origin}/api/maletas`)
      .then((res) => res.json())
      .then((data) => setMaletas(data || []))
      .catch(() => setMessage("Erro ao carregar maletas"));
  }, []);

  // Socket.IO global (como no Scanner)
  useEffect(() => {
    const socket = io(window.location.origin, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket conectado para validação");
    });

    socket.on("detection_result", (data) => {
      if (data.success && data.detected && data.detected.length > 0) {
        setDetectedItems(data.detected);
        drawBoxes(data.bboxes || []);
        compararComIdeal(data.detected);
      } else {
        setDetectedItems([]);
        clearCanvas();
        setComparacao(null);
        setStatusMessage("Nenhum item detectado");
      }
    });

    return () => socket.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maletaSelecionada]); // reconecta se mudar maleta

  const drawBoxes = (boxes) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    boxes.forEach((box) => {
      ctx.strokeStyle = "#00ff00";
      ctx.lineWidth = 4;
      ctx.strokeRect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
      ctx.fillStyle = "#00ff00";
      ctx.font = "20px Arial";
      ctx.fillText(
        `${box.class} ${Math.round(box.conf * 100)}%`,
        box.x1 + 10,
        box.y1 + 30
      );
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const iniciarScanner = async () => {
    if (!maletaSelecionada) {
      alert("Selecione uma maleta primeiro");
      return;
    }

    setScanning(true);
    setDetectedItems([]);
    setComparacao(null);
    setStatusMessage("Abrindo câmera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStatusMessage("Câmera aberta! Posicione a maleta...");

      const interval = setInterval(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA)
          return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64 = canvas.toDataURL("image/jpeg", 0.4);

        socketRef.current.emit("frame", { image: base64 });
      }, 600);

      videoRef.current.interval = interval;
    } catch (err) {
      setStatusMessage("Erro na câmera: " + err.message);
      setScanning(false);
    }
  };

  const pararScanner = () => {
    setScanning(false);
    setDetectedItems([]);
    setComparacao(null);
    setStatusMessage("Selecione uma maleta para validar");

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current?.interval) {
      clearInterval(videoRef.current.interval);
    }

    clearCanvas();
  };

  const compararComIdeal = (detectados) => {
    if (!maletaSelecionada) return;

    const idealMap = {};
    maletaSelecionada.composicao.forEach((item) => {
      idealMap[item.instrumento_id] = item.quantidade_ideal;
    });

    const detectadoMap = {};
    detectados.forEach((d) => {
      const inst = maletaSelecionada.composicao.find((i) =>
        i.nome.toLowerCase().includes(d.class.toLowerCase())
      );
      if (inst) {
        detectadoMap[inst.instrumento_id] =
          (detectadoMap[inst.instrumento_id] || 0) + 1;
      }
    });

    const faltando = [];
    const sobrando = [];
    const ok = [];

    maletaSelecionada.composicao.forEach((item) => {
      const det = detectadoMap[item.instrumento_id] || 0;
      if (det === item.quantidade_ideal) {
        ok.push(item);
      } else if (det < item.quantidade_ideal) {
        faltando.push({ ...item, detectado: det });
      } else {
        sobrando.push({ ...item, detectado: det });
      }
    });

    const completo = faltando.length === 0 && sobrando.length === 0;
    setComparacao({ completo, faltando, sobrando, ok, detectadoMap });
    setStatusMessage(
      completo ? "Maleta completa! ✅" : "Itens faltando ou sobrando ⚠️"
    );
  };

  const confirmarRetorno = async () => {
    if (!responsavel.trim()) {
      alert("Nome do responsável obrigatório");
      return;
    }

    if (
      !comparacao?.completo &&
      !window.confirm("Maleta incompleta. Confirmar retorno mesmo assim?")
    ) {
      return;
    }

    setSaving(true);
    setMessage("");

    const detectados = [];
    if (comparacao && comparacao.detectadoMap) {
      Object.keys(comparacao.detectadoMap).forEach((id) => {
        detectados.push({
          instrumento_id: parseInt(id),
          quantidade: comparacao.detectadoMap[id],
        });
      });
    }

    try {
      const res = await fetch(
        `${window.location.origin}/api/maletas/retornar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            maleta_id: maletaSelecionada.id,
            responsavel: responsavel.trim(),
            detectados: detectados,
          }),
        }
      );

      const data = await res.json();
      setMessage(
        data.success
          ? "Retorno registrado com sucesso!"
          : data.message || "Erro"
      );
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setMessage("Erro de conexão");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="validate-kit-container">
      {/* Header fixo */}
      <HeaderPadronizado title="Validar Maleta" />

      {/* Área fixa: câmera + botão iniciar/parar + status */}
      <div className="camera-fixed">
        <div className="scanner-frame">
          <video
            ref={videoRef}
            style={{ width: "100%", display: scanning ? "block" : "none" }}
            playsInline
            muted
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: scanning ? "block" : "none",
            }}
          />
          {!scanning && (
            <>
              <img src={scanImage} alt="Preview" className="scan-img" />
              <div className="scan-overlay">
                <div className="scan-line"></div>
              </div>
            </>
          )}
        </div>

        {!scanning ? (
          <div>
            <select
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                margin: "20px 0",
              }}
              value={maletaSelecionada?.id || ""}
              onChange={(e) => {
                const selected = maletas.find((m) => m.id == e.target.value);
                setMaletaSelecionada(selected || null);
                if (selected)
                  setStatusMessage(`Maleta "${selected.nome}" selecionada`);
              }}
            >
              <option value="">-- Escolha uma maleta --</option>
              {maletas.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome} ({m.composicao.length} itens)
                </option>
              ))}
            </select>

            <button
              className="scanner-btn"
              onClick={iniciarScanner}
              disabled={!maletaSelecionada}
            >
              Iniciar Validação
            </button>
          </div>
        ) : (
          <button className="scanner-btn" onClick={pararScanner}>
            Parar Validação
          </button>
        )}

        <p style={{ textAlign: "center", margin: "20px 0", fontSize: "18px" }}>
          {statusMessage}
        </p>
      </div>

      {/* Área rolável: resultado da validação */}
      <div className="scrollable-content">
        {comparacao && (
          <div className="results-card">
            <h3 style={{ marginBottom: "16px" }}>Resultado da Validação</h3>

            {comparacao.completo ? (
              <p
                style={{
                  color: "green",
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "center",
                  margin: "30px 0",
                }}
              >
                ✅ Maleta completa! Todos os itens detectados.
              </p>
            ) : (
              <div style={{ margin: "20px 0" }}>
                {comparacao.faltando.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      ⚠️ Itens Faltando:
                    </p>
                    {comparacao.faltando.map((f) => (
                      <p
                        key={f.instrumento_id}
                        style={{ margin: "8px 0", paddingLeft: "10px" }}
                      >
                        • <strong>{f.nome}</strong>: {f.detectado} detectado /{" "}
                        {f.quantidade_ideal} ideal
                      </p>
                    ))}
                  </div>
                )}

                {comparacao.sobrando.length > 0 && (
                  <div>
                    <p
                      style={{
                        color: "#e67e22",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      ⚠️ Itens Sobrando:
                    </p>
                    {comparacao.sobrando.map((s) => (
                      <p
                        key={s.instrumento_id}
                        style={{ margin: "8px 0", paddingLeft: "10px" }}
                      >
                        • <strong>{s.nome}</strong>: {s.detectado} detectado /{" "}
                        {s.quantidade_ideal} ideal
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <input
              type="text"
              placeholder="Nome do responsável"
              value={responsavel}
              onChange={(e) => setResponsavel(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                margin: "30px 0 20px 0",
                fontSize: "16px",
                borderRadius: "12px",
                border: "1px solid #ddd",
              }}
            />

            <button
              className="scanner-btn"
              style={{ width: "100%", padding: "16px", fontSize: "18px" }}
              onClick={confirmarRetorno}
              disabled={saving}
            >
              {saving ? "Registrando retorno..." : "Confirmar Retorno"}
            </button>
          </div>
        )}
      </div>

      {message && <div className="message-overlay">{message}</div>}
    </div>
  );
};

export default ValidateKit;
