import { registrar } from "../services/Auth";

const handleRegistro = async () => {
  try {
    if (!username || !password) {
      alert("Completa los campos");
      return;
    }

    await registrar(username, password);

    alert("Usuario creado");
  } catch (error) {
    console.error(error);
    alert("Error al registrar");
  }
};

