const URL = import.meta.env.VITE_API_URL;

// Obtener vehículos
export const obtenerVehiculos = async () => {
  const res = await fetch(`${URL}/vehiculos`);
  return await res.json();
};

// Crear vehículo
export const crearVehiculo = async (placa, tipo) => {
  const res = await fetch(`${URL}/vehiculos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ placa, tipo }),
  });

  return await res.json();
};

// Registrar salida
export const registrarSalida = async (id) => {
  const res = await fetch(`${URL}/vehiculos/${id}`, {
    method: "PUT",
  });

  return await res.json();
};

// Obtener historial
export const obtenerHistorial = async () => {
  const res = await fetch(`${URL}/historial`);
  return await res.json();
};