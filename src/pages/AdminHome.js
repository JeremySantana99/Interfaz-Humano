import React, { useState, useEffect } from "react";

function AdminHome({ nombre, onLogout }) {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    // Simula recibir solicitudes de clientes
    const listener = setInterval(() => {
      const guardadas = JSON.parse(localStorage.getItem("solicitudes")) || [];
      setSolicitudes(guardadas);
    }, 2000);
    return () => clearInterval(listener);
  }, []);

  const gestionar = (id, estadoNuevo) => {
    const actualizadas = solicitudes.map((s) =>
      s.id === id ? { ...s, estado: estadoNuevo } : s
    );
    setSolicitudes(actualizadas);
    localStorage.setItem("solicitudes", JSON.stringify(actualizadas));
  };

  return (
    <div className="admin-home">
      <h2>Administrador: {nombre}</h2>
      <button onClick={onLogout}>Cerrar Sesión</button>
      <h3>Solicitudes Pendientes</h3>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        solicitudes.map((s) => (
          <div key={s.id}>
            <p><strong>{s.fecha}</strong> - {s.motivo} (${s.monto})</p>
            <p><strong>Estado actual:</strong> {s.estado}</p>
            {s.estado === "Pendiente" && (
              <>
                <button onClick={() => gestionar(s.id, "Aprobado")}>Aprobar</button>
                <button onClick={() => gestionar(s.id, "Rechazado")}>Rechazar</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminHome;
