import React from "react";
import "./InfoCards.css";

function InfoCards() {
  return (
    <section className="info-cards">
      <div className="card">
        <img src="/assets/icons/credito.png" alt="Créditos Solidarios" />
        <h3>Créditos Solidarios</h3>
        <p>Impulsa tu idea con apoyo de tu comunidad.</p>
      </div>
      <div className="card">
        <img src="/assets/icons/transparencia.png" alt="Procesos Transparentes" />
        <h3>Procesos Transparentes</h3>
        <p>Decisiones claras, sin letras pequeñas.</p>
      </div>
      <div className="card">
        <img src="/assets/icons/tasas.png" alt="Tasas Asequibles" />
        <h3>Tasas Asequibles</h3>
        <p>Costos justos y condiciones humanas.</p>
      </div>
    </section>
  );
}

export default InfoCards;
