import { useState } from "react";

function Detector() {
  const [image, setImagen] = useState(null);
  const [preview, setPreview] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const manejarImagen = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const detectar = async () => {
    if (!image) {
      setMensaje("Seleccione una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true); // 🔥 inicia escaneo
    setMensaje("Detectando placa...");

    try {
      setMensaje("Detectando placa...");

      const res = await fetch(`${API_URL}/detectar`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("RESPUESTA BACKEND:", data);

      if (!data.placa || data.placa === "No detectada") {
        setMensaje(data.error || "Error detectando placa");
        return;
      }

      setPlaca(data.placa);
      setMensaje("Placa detectada correctamente");

    } catch (error) {
      console.log(error);
      setMensaje("Error detectando placa");
    }
  };

  const registrarVehiculo = async () => {
    if (!placa) {
      setMensaje("No hay placa detectada");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/vehiculos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placa,
          tipo,
        }),
      });

      const data = await res.json();

      if (data.error) {
        setMensaje(data.error);
        return;
      }

      setMensaje("Vehículo registrado correctamente");

      setPlaca("");
      setImagen(null);
      setPreview("");

    } catch (error) {
      console.log(error);
      setMensaje("Error registrando vehículo");
    }
  };

  // 👇 IMPORTANTE: retornas todo
  return {
    image,
    preview,
    placa,
    tipo,
    mensaje,
    setTipo,
    manejarImagen,
    detectar,
    registrarVehiculo,
  };
}

export default Detector;