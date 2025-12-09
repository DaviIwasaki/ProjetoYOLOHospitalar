# app/services/yolo_service.py
from ultralytics import YOLO
import cv2
from PIL import Image
import numpy as np
from io import BytesIO
from base64 import b64decode
import os
import re

class YoloService:
    def __init__(self):
        model_path = 'app/models_yolo/yolov8n.pt'
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Modelo YOLO não encontrado em {model_path}")
        
        print("1. Carregando YOLOv8n oficial...")
        self.model = YOLO(model_path)
        print("2. YOLO CARREGADO COM SUCESSO!")

    def process_frame(self, base64_image, maleta_id=None):
        print("3. PROCESSANDO FRAME...")
        try:
            # Remove prefixo com regex
            base64_image = re.sub(r'^data:image/[a-z]+;base64,', '', base64_image)
            print("4. Base64 limpo: " + base64_image[:50] + "...")  # Mostra começo do base64

            img_bytes = b64decode(base64_image)
            print("5. Bytes decodificados com sucesso (tamanho: " + str(len(img_bytes)) + ")")

            img = Image.open(BytesIO(img_bytes)).convert('RGB')
            img_cv = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
            print("6. Imagem convertida para CV2.")

            # Detecção
            results = self.model(img_cv, conf=0.25, verbose=False)[0]
            print("7. Detecção completa.")

            detected = []
            bboxes = []

            for box in results.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())
                conf = round(float(box.conf[0]), 2)
                cls_id = int(box.cls[0])
                class_name = results.names[cls_id]

                print(f"8. Detectado: {class_name} ({conf})")

                detected.append({"class": class_name, "confidence": conf})
                bboxes.append({"x1": x1, "y1": y1, "x2": x2, "y2": y2, "class": class_name, "conf": conf})

            return {
                "success": True,
                "total": len(detected),
                "detected": detected,
                "bboxes": bboxes
            }

        except Exception as e:
            print(f"ERRO NO PROCESSAMENTO: {e}")
            return {"success": False, "error": str(e)}