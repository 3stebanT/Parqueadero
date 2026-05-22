import { useState, useEffect } from "react";
import { obtenerVehiculos } from "../services/api";
import Factura from "../components/Factura";

function Salida() {
  const [vehiculos, setVehiculos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [vehiculo, setVehiculo] = useState(null);
  const [factura, setFactura] = useState(null);
  const [mostrarFactura, setMostrarFactura] = useState(false);

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const URL = import.meta.env.VITE_API_URL;
  
  const cargarVehiculos = async () => {
    const data = await obtenerVehiculos();
    setVehiculos(data);
  };

  // BUSCAR VEHÍCULO
  const buscarVehiculo = (placa) => {
    const encontrado = vehiculos.find(
      (v) => v.placa.toLowerCase().trim() === placa.toLowerCase().trim()
    );

    setVehiculo(encontrado || null);
    setMostrarFactura(false);
    setFactura(null);
  };

  // GENERAR FACTURA (CONGELADA)
  const generarFactura = () => {
    if (!vehiculo) return;

    const horaEntrada = new Date(vehiculo.hora_entrada);
    const horaSalida = new Date();

    const minutos = Math.ceil((horaSalida - horaEntrada) / 60000);

    const base = vehiculo.tipo === "carro" ? 3000 : 2000;
    const valorMinuto = vehiculo.tipo === "carro" ? 100 : 50;

    const total = base + minutos * valorMinuto;

    setFactura({
      idVehiculo: vehiculo.id,
      placa: vehiculo.placa,
      tipo: vehiculo.tipo,
      horaEntrada,
      horaSalida,
      minutos,
      base,
      valorMinuto,
      total,
    });

    setMostrarFactura(true);
  };

  // CONFIRMAR SALIDA
  const confirmarSalida = async () => {
    try {
      await fetch(`${URL}/vehiculos/${factura.idVehiculo}`, {
        method: "PUT",
      });

      setVehiculo(null);
      setFactura(null);
      setBusqueda("");
      setMostrarFactura(false);

      cargarVehiculos();
    } catch (error) {
      console.log(error);
      alert("Error al registrar salida");
    }
  };

  return (
    <div className="container-fluid mt-3">

      <h2 className="mb-3">Sacar Vehículo</h2>

      {/* 🔎 INPUT */}
      <input
        className="form-control mb-3"
        placeholder="Buscar placa..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          buscarVehiculo(e.target.value);
        }}
      />

      {/* VEHÍCULO ENCONTRADO */}
      {vehiculo && (
        <div className="card p-3 mb-3">
          <b>{vehiculo.placa}</b>
          <small className="text-muted">{vehiculo.tipo}</small>

          <button
            className="btn btn-warning mt-2"
            onClick={generarFactura}
          >
            Generar factura
          </button>
        </div>
      )}

      {/* FACTURA */}
      {mostrarFactura && factura && (
        <>
          <Factura factura={factura} />

          <button
            className="btn btn-danger mt-3 w-100"
            onClick={confirmarSalida}
          >
            Confirmar salida
          </button>
        </>
      )}

    </div>
  );
}

export default Salida;