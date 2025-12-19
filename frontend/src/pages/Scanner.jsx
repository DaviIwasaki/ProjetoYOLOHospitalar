// frontend/src/pages/Scanner.jsx

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../styles/Scanner.css";
import scanImage from "../assets/scan-preview.png";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  const [detectedItems, setDetectedItems] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Pronto para escanear");

  const maletaId = 1;

  useEffect(() => {
    const backendUrl = window.location.origin;
    const socket = io(backendUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket conectado ao backend!");
      setStatusMessage("Conectado ao servidor YOLO");
    });

    socket.on("connect_error", (err) => {
      console.log("Erro de conexão:", err);
      setStatusMessage("Erro de conexão com o servidor");
    });

    socket.on("detection_result", (data) => {
      console.log("Resultado YOLO:", data);
      if (data.success && data.total > 0) {
        setDetectedItems(data.detected);
        drawBoxes(data.bboxes);
        setStatusMessage(`${data.total} objeto(s) detectado(s)`);
      } else if (data.success) {
        setDetectedItems([]);
        clearCanvas();
        setStatusMessage("Nenhum objeto detectado");
      } else {
        setStatusMessage("Erro no processamento");
      }
    });

    return () => socket.disconnect();
  }, []);

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
        `${box.class} ${(box.conf * 100).toFixed(0)}%`,
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

  const startScanning = async () => {
    setScanning(true);
    setDetectedItems([]);
    setStatusMessage("Abrindo câmera...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setStatusMessage("Câmera aberta! Enviando frames...");

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

        socketRef.current.emit("frame", {
          image: base64,
          maleta_id: maletaId,
        });
      }, 500);

      videoRef.current.interval = interval;
    } catch (err) {
      setStatusMessage("Erro na câmera: " + err.message);
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
    setStatusMessage("Escaneamento parado");

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }

    if (videoRef.current?.interval) {
      clearInterval(videoRef.current.interval);
    }

    clearCanvas();
    setDetectedItems([]);
  };

  // Função auxiliar para capturar o frame atual com bounding boxes
  const captureCurrentFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.toDataURL("image/jpeg", 0.8); // boa qualidade para exibição
  };

  // Handler do clique no item detectado
  const handleItemClick = (item) => {
    const capturedImage = captureCurrentFrame();
    if (!capturedImage) {
      alert("Erro ao capturar imagem do frame");
      return;
    }

    // Salva os dados no localStorage
    localStorage.setItem(
      "recognitionData",
      JSON.stringify({
        detectedItem: item,
        capturedImage: capturedImage,
        allDetected: detectedItems,
        timestamp: Date.now(),
      })
    );

    // Força navegação completa (necessário quando Flask serve o build)
    window.location.href = "/recognition-result";
  };

  return (
    <div className="scanner-container">
      <div className="camera-section">
        <div className="scanner-frame" style={{ position: "relative" }}>
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
            <img src={scanImage} alt="Preview" className="scan-img" />
          )}
          <div className="scan-overlay">
            <div className="scan-line"></div>
          </div>
        </div>

        <button
          className="scanner-btn"
          onClick={scanning ? stopScanning : startScanning}
        >
          {scanning ? "Parar Escaneamento" : "Iniciar Escaneamento"}
        </button>

        <p>{statusMessage}</p>
      </div>

      <section className="results-section">
        <h3>Itens Detectados</h3>
        <div className="product-list">
          {detectedItems.length === 0 ? (
            <p>Nenhum item detectado</p>
          ) : (
            detectedItems.map((item, i) => (
              <div
                className="product-item clickable"
                key={i}
                onClick={() => handleItemClick(item)}
              >
                <div className="product-info">
                  <p className="product-name">{item.class}</p>
                  <p className="product-id">
                    Confiança: {(item.confidence * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="arrow-icon">→</div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Scanner;