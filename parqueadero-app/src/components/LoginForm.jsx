import Login from "../pages/login";
import { login } from "../services/Auth";

const handleLogin = async () => {
  const user = await login(username, password);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/dashboard";
  } else {
    alert("Credenciales incorrectas");
  }
};