import React, { useState } from "react";
import "./ClienteNavbar.css";

function ClienteNavbar({ nombre, onLogout, onVistaChange }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <header className="navbar-cliente">
      <div className="navbar-izquierda">
        <h1 className="titulo">Microcréditos Solidarios</h1>
        <nav className="menu-horizontal">
          <button onClick={() => onVistaChange("solicitud")}>🧾 Solicitud</button>
          <button onClick={() => onVistaChange("estado")}>📊 Estado</button>
          <button onClick={() => onVistaChange("historial")}>📜 Historial</button>
          <button onClick={() => onVistaChange("simulador")}>💸 Simulador</button>
          <button onClick={() => onVistaChange("calendario")}>📅 Calendario</button>
          <button onClick={() => onVistaChange("tasas")}>📈 Tasas</button>
          <button onClick={() => onVistaChange("documentos")}>📂 Documentos</button>
          <button onClick={() => onVistaChange("soporte")}>💬 Soporte</button>
        </nav>
      </div>

      <div className="navbar-derecha">
        <span className="bienvenida">Bienvenido, {nombre}</span>
        <button className="hamburguesa" onClick={toggleMenu}>☰</button>
        {showMenu && (
          <div className="dropdown-menu">
            <button onClick={() => onVistaChange("perfil")}>🧍 Perfil</button>
            <button onClick={onLogout}>🔒 Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
}

export default ClienteNavbar;
