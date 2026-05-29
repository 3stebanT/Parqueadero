import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  obtenerVehiculos,
  crearVehiculo,
  registrarSalida,
} from "./services/api";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Vehiculos from "./pages/vehiculos";
import Historialpage from "./pages/Historial";
import Ingreso from "./pages/Ingreso";
import Salida from "./pages/Salida";
import DetectorPlacas from "./pages/DetectorPlacas";

import Layout from "./components/layout/Layout";

// OJO: coincide con tu archivo Layoutinicio.jsx
import LayoutInicio from "./pages/layout/LayoutInicio";

function App() {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = async () => {
    const data = await obtenerVehiculos();
    setVehiculos(data);
  };

  const agregarVehiculo = async (placa, tipo) => {
    await crearVehiculo(placa, tipo);
    cargarVehiculos();
  };

  // Cambié el nombre para evitar recursión infinita
  const manejarSalida = async (id) => {
    await registrarSalida(id);
    cargarVehiculos();
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* PÚBLICO */}
        <Route
          path="/"
          element={
            <LayoutInicio>
              <Ingreso onAgregar={agregarVehiculo} />
            </LayoutInicio>
          }
        />

        <Route
          path="/salida"
          element={
            <LayoutInicio>
              <Salida
                vehiculos={vehiculos}
                onSalida={manejarSalida}
              />
            </LayoutInicio>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* PRIVADO */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/vehiculos"
          element={
            <PrivateRoute>
              <Layout>
                <Vehiculos
                  vehiculos={vehiculos}
                  onAgregar={agregarVehiculo}
                  onSalida={manejarSalida}
                />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/historial"
          element={
            <PrivateRoute>
              <Layout>
                <Historialpage />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/detector"
          element={
          <PrivateRoute>
          <Layout>
          <DetectorPlacas />
          </Layout>
          </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;