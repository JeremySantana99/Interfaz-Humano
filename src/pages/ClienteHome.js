import React, { useState } from "react";
import ClienteNavbar from "../components/ClienteNavbar";
import SolicitudForm from "../components/SolicitudForm"; 
import HistorialSolicitudes from "../components/HistorialSolicitudes";
import HistorialCreditos from "../components/HistorialCreditos";
import SimuladorCredito from "../components/SimuladorCredito";
import CalendarioPagos from "../components/CalendarioPagos";
import TasasInfo from "../components/TasasInfo";
import DocumentUploader from "../components/DocumentUploader";
import PerfilCliente from "../components/PerfilCliente";
import FormularioSoporte from "../components/FormularioSoporte";
import "./ClienteHome.css";

function ClienteHome({ nombre, onLogout }) {
  const [vista, setVista] = useState("inicio");

  const renderContenido = () => {
    switch (vista) {
      case "solicitud":
        return <SolicitudForm correo={nombre} />;
      case "estado":
        return <HistorialSolicitudes correo={nombre} />;
      case "historial":
        return <HistorialCreditos correo={nombre} />;
      case "simulador":
        return <SimuladorCredito />;
      case "calendario":
        return <CalendarioPagos />;
      case "tasas":
        return <TasasInfo />;
      case "documentos":
        return <DocumentUploader correo={nombre} />;
      case "perfil":
        return <PerfilCliente correo={nombre} />;
      case "soporte":
        return <FormularioSoporte correo={nombre} />;
      default:
        return <h3 style={{ padding: "2rem" }}>👋 Bienvenido/a, {nombre}</h3>;
    }
  };

  return (
    <div>
      <ClienteNavbar nombre={nombre} onLogout={onLogout} onVistaChange={setVista} />
      <main className="cliente-main">
        {renderContenido()}
      </main>
    </div>
  );
}

export default ClienteHome;