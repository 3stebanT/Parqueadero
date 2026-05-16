const URL = import.meta.env.VITE_API_URL;

export const obtenerUsuarios = async () => {
  const res = await fetch(`${URL}/usuarios`);
  return await res.json();
};

// LOGIN
export const login = async (username, password) => {
  const res = await fetch(`${URL}/usuarios?username=${username}&password=${password}`);
  const data = await res.json();

  return data[0]; // si existe usuario
};

// REGISTRO
export const registrar = async (username, password) => {
  const res = await fetch(`${URL}/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      rol: "ADMIN" // o USER
    }),
  });

  const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Error al registrar usuario");
    }

    return data;
};