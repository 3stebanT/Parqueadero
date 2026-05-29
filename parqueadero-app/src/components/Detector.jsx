import { useState } from "react";

export function useDetector() {
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
    if (!image) return setMensaje("Seleccione una imagen");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setMensaje("Detectando placa...");

    try {
      const res = await fetch(`${API_URL}/detectar`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.placa || data.placa === "No detectada") {
        setMensaje(data.error || "Error detectando placa");
        return;
      }

      setPlaca(data.placa);
      setMensaje("Placa detectada correctamente");

    } catch (error) {
      setMensaje("Error detectando placa");
    } finally {
      setLoading(false);
    }
  };

  const registrarVehiculo = async () => {
    if (!placa) return setMensaje("No hay placa detectada");

    try {
      const res = await fetch(`${API_URL}/vehiculos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa, tipo }),
      });

      const data = await res.json();

      if (data.error) return setMensaje(data.error);

      setMensaje("Vehículo registrado correctamente");
      setPlaca("");
      setImagen(null);
      setPreview("");

    } catch (error) {
      setMensaje("Error registrando vehículo");
    }
  };

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
    loading
  };
}