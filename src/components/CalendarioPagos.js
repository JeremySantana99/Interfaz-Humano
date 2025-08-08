import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarioPagos() {
  const [value, setValue] = useState(new Date());

  // Simulamos fechas de pago (puedes reemplazar luego por datos reales desde Firebase)
  const fechasPago = [
    new Date(2025, 7, 15), // 15 agosto 2025
    new Date(2025, 8, 15), // 15 septiembre 2025
    new Date(2025, 9, 15), // 15 octubre 2025
  ];

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const esFechaPago = fechasPago.some(
        (f) => f.toDateString() === date.toDateString()
      );
      return esFechaPago ? "fecha-pago" : null;
    }
  };

  return (
    <div>
      <h3>📅 Calendario de Pagos</h3>
      <p>Visualiza las fechas importantes de tus próximos pagos.</p>

      <Calendar
        onChange={setValue}
        value={value}
        tileClassName={tileClassName}
      />

      <style>{`
        .fecha-pago {
          background: #1e90ff;
          color: white;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}

export default CalendarioPagos;
