import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function HistorialCreditos({ correo }) {
  const [creditos, setCreditos] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "solicitudes"),
      where("correo", "==", correo),
      where("estado", "==", "Aprobado")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCreditos(lista);
    });

    return () => unsub();
  }, [correo]);

  return (
    <div>
      <h3>📜 Historial de Créditos Aprobados</h3>
      {creditos.length === 0 ? (
        <p>No hay créditos aprobados aún.</p>
      ) : (
        <ul>
          {creditos.map((c) => (
            <li key={c.id} style={{ border: "1px solid #ddd", marginBottom: "10px", padding: "10px" }}>
              <strong>Monto:</strong> ${c.monto}<br />
              <strong>Motivo:</strong> {c.motivo}<br />
              <strong>Plazo:</strong> {c.plazo} meses<br />
              <strong>Ingresos:</strong> ${c.ingresos}<br />
              <strong>Estado:</strong> {c.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HistorialCreditos;
