import React, { useEffect } from "react";
import "./Footer.css";

function Footer() {
  useEffect(() => {
    const btn = document.getElementById("footerModoOscuroBtn");
    const body = document.body;

    const alternar = () => {
      body.classList.toggle("dark-mode");
      btn.textContent = body.classList.contains("dark-mode")
        ? "Apagar 🌞"
        : "Encender 🌙";
    };

    btn.addEventListener("click", alternar);
    return () => btn.removeEventListener("click", alternar);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-izquierda">
          <img src="/assets/icons/solidario.png" alt="Logo solidario" className="footer-logo" />
          <div className="footer-tema">
            <label htmlFor="footerModoOscuroBtn">Tema:</label>
            <button id="footerModoOscuroBtn">Encender 🌙</button>
          </div>
        </div>

        <div className="footer-contacto">
          <p><strong>Contáctanos:</strong> +593 9 1234 5678</p>
          <p><strong>Correo:</strong> soporte@microcreditossolidarios.com</p>
          <p><strong>Dirección:</strong> Av. 10 de Agosto y Amazonas, Quito</p>
        </div>
      </div>

      <div className="footer-copy">
        © 2025 Plataforma de Microcréditos Solidarios. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
