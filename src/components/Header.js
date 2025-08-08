import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="navbar">
      <div className="logo">
        <span>Microcréditos Solidarios</span>
        <img src="/assets/icons/solidario.png" alt="Logo solidario" />
      </div>
      <nav className="menu">
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li className="dropdown">
            <a href="#microcreditos">Microcréditos</a>
            <div className="dropdown-content">
              <p>Accede a microcréditos comunitarios con respaldo solidario.</p>
            </div>
          </li>
          <li className="dropdown">
            <a href="#requisitos">Requisitos</a>
            <div className="dropdown-content">
              <p>Cédula, plan de inversión, respaldo solidario.</p>
            </div>
          </li>
          <li className="dropdown">
            <a href="#sobrenosotros">Sobre Nosotros</a>
            <div className="dropdown-content">
              <p>Plataforma que impulsa a emprendedores locales.</p>
            </div>
          </li>
          <li><button id="loginBtn">Iniciar Sesión</button></li>
          <li><button id="registroBtn">Registrarse</button></li>
          <li><button id="menuHamburguesa">☰</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
