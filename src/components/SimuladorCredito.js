import React, { useState } from "react";

function SimuladorCredito() {
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState(""); // en meses
  const [tasa, setTasa] = useState("5"); // porcentaje mensual fija por defecto
  const [cuota, setCuota] = useState(null);

  const calcularCuota = () => {
    const m = parseFloat(monto);
    const n = parseInt(plazo);
    const i = parseFloat(tasa) / 100;

    if (isNaN(m) || isNaN(n) || isNaN(i) || m <= 0 || n <= 0 || i <= 0) {
      alert("Completa todos los campos con valores válidos.");
      return;
    }

    // Fórmula de amortización: cuota fija mensual
    const cuotaMensual = (m * i) / (1 - Math.pow(1 + i, -n));
    setCuota(cuotaMensual.toFixed(2));
  };

  return (
    <div>
      <h3>💸 Simulador de Crédito</h3>
      <p>Ingresa los valores para estimar tu cuota mensual:</p>

      <label>Monto a solicitar ($):</label>
      <input
        type="number"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Ej: 500"
      />

      <label>Plazo (meses):</label>
      <input
        type="number"
        value={plazo}
        onChange={(e) => setPlazo(e.target.value)}
        placeholder="Ej: 12"
      />

      <label>Tasa mensual (%):</label>
      <input
        type="number"
        value={tasa}
        onChange={(e) => setTasa(e.target.value)}
        placeholder="Ej: 5"
      />

      <button onClick={calcularCuota}>Calcular</button>

      {cuota && (
        <div style={{ marginTop: "1em", background: "#f2f2f2", padding: "10px" }}>
          <strong>📌 Cuota estimada mensual: ${cuota}</strong>
        </div>
      )}
    </div>
  );
}

export default SimuladorCredito;
