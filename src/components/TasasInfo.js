import React from "react";
import "./TasasInfo.css";

function TasasInfo() {
  const tasas = [
    { tipo: "Crédito Personal", interes: "14% anual" },
    { tipo: "Crédito Emprendimiento", interes: "10% anual" },
    { tipo: "Crédito de Emergencia", interes: "8% anual" },
  ];

  const consejos = [
    "No solicites más de lo que puedes pagar.",
    "Revisa el calendario de pagos frecuentemente.",
    "Lleva un control mensual de tus ingresos y egresos.",
    "Consolida tus deudas si manejas múltiples créditos.",
  ];

  return (
    <div className="tasas-info">
      <h3>📈 Tasas de Interés</h3>
      <table>
        <thead>
          <tr>
            <th>Tipo de Crédito</th>
            <th>Tasa de Interés</th>
          </tr>
        </thead>
        <tbody>
          {tasas.map((tasa, idx) => (
            <tr key={idx}>
              <td>{tasa.tipo}</td>
              <td>{tasa.interes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>💡 Consejos Financieros</h3>
      <ul>
        {consejos.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default TasasInfo;
