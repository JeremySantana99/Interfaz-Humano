import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function HistorialSolicitudes({ correo }) {
  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudesFiltradas, setSolicitudesFiltradas] = useState([]);
  const [filtros, setFiltros] = useState({ estado: "", montoMin: "", motivo: "" });

  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({
    monto: "",
    plazo: "",
    motivo: "",
    ingresos: "",
  });
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const q = query(collection(db, "solicitudes"), where("correo", "==", correo));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSolicitudes(datos);
      setSolicitudesFiltradas(datos);
    });
    return () => unsubscribe();
  }, [correo]);

  // 🧠 Aplicar filtros
  useEffect(() => {
    let filtradas = [...solicitudes];
    if (filtros.estado) {
      filtradas = filtradas.filter((s) => s.estado === filtros.estado);
    }
    if (filtros.montoMin) {
      filtradas = filtradas.filter((s) => Number(s.monto) >= Number(filtros.montoMin));
    }
    if (filtros.motivo) {
      filtradas = filtradas.filter((s) =>
        s.motivo.toLowerCase().includes(filtros.motivo.toLowerCase())
      );
    }
    setSolicitudesFiltradas(filtradas);
  }, [filtros, solicitudes]);

  const cancelarSolicitud = async (id) => {
    if (!window.confirm("¿Seguro que deseas cancelar esta solicitud?")) return;
    try {
      await deleteDoc(doc(db, "solicitudes", id));
      alert("Solicitud cancelada correctamente.");
    } catch (err) {
      alert("Error al cancelar solicitud.");
    }
  };

  const iniciarEdicion = (solicitud) => {
    setEditandoId(solicitud.id);
    setFormEdit({
      monto: solicitud.monto,
      plazo: solicitud.plazo,
      motivo: solicitud.motivo,
      ingresos: solicitud.ingresos,
    });
    setErrores({});
    setMensaje("");
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setErrores({});
    setMensaje("");
  };

  const validar = () => {
    const err = {};
    if (!formEdit.monto || isNaN(formEdit.monto) || Number(formEdit.monto) <= 0) {
      err.monto = "Ingrese un monto válido.";
    }
    if (!formEdit.plazo || isNaN(formEdit.plazo) || formEdit.plazo < 1 || formEdit.plazo > 60) {
      err.plazo = "Plazo debe ser entre 1 y 60 meses.";
    }
    if (!formEdit.motivo || formEdit.motivo.length < 10) {
      err.motivo = "Describa el motivo (mínimo 10 caracteres).";
    }
    if (!formEdit.ingresos || isNaN(formEdit.ingresos) || Number(formEdit.ingresos) <= 0) {
      err.ingresos = "Ingrese ingresos válidos.";
    }
    return err;
  };

  const guardarEdicion = async () => {
    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      await updateDoc(doc(db, "solicitudes", editandoId), { ...formEdit });
      setMensaje("✅ Solicitud actualizada correctamente.");
      setEditandoId(null);
    } catch (err) {
      setMensaje("❌ Error al actualizar. Intente más tarde.");
    }
  };

  const limpiarFiltros = () => {
    setFiltros({ estado: "", montoMin: "", motivo: "" });
  };

  return (
    <div className="historial">
      <h3>📄 Historial de Solicitudes</h3>

      {/* 🔍 Filtros */}
      <div style={{ background: "#f1f1f1", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
        <h4>🔎 Filtros de búsqueda</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <label>Estado:</label>
            <select value={filtros.estado} onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}>
              <option value="">Todos</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Rechazado">Rechazado</option>
            </select>
          </div>
          <div>
            <label>Monto mínimo:</label>
            <input
              type="number"
              value={filtros.montoMin}
              onChange={(e) => setFiltros({ ...filtros, montoMin: e.target.value })}
              placeholder="USD"
            />
          </div>
          <div>
            <label>Motivo contiene:</label>
            <input
              type="text"
              value={filtros.motivo}
              onChange={(e) => setFiltros({ ...filtros, motivo: e.target.value })}
              placeholder="Buscar motivo..."
            />
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button onClick={limpiarFiltros}>🧹 Limpiar filtros</button>
          </div>
        </div>
      </div>

      {solicitudesFiltradas.length === 0 ? (
        <p>🔍 No se encontraron resultados con los filtros aplicados.</p>
      ) : (
        <ul>
          {solicitudesFiltradas.map((s) =>
            s.id === editandoId ? (
              <li key={s.id} style={{ border: "2px solid #007acc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
                <h4>✏️ Editar Solicitud</h4>
                <label>Monto (USD):</label>
                <input
                  type="number"
                  value={formEdit.monto}
                  onChange={(e) => setFormEdit({ ...formEdit, monto: e.target.value })}
                />
                {errores.monto && <p className="error">{errores.monto}</p>}

                <label>Plazo (meses):</label>
                <select
                  value={formEdit.plazo}
                  onChange={(e) => setFormEdit({ ...formEdit, plazo: e.target.value })}
                >
                  <option value="">Seleccione</option>
                  {[...Array(60)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} meses</option>
                  ))}
                </select>
                {errores.plazo && <p className="error">{errores.plazo}</p>}

                <label>Motivo:</label>
                <textarea
                  value={formEdit.motivo}
                  onChange={(e) => setFormEdit({ ...formEdit, motivo: e.target.value })}
                  rows={3}
                />
                {errores.motivo && <p className="error">{errores.motivo}</p>}

                <label>Ingresos mensuales (USD):</label>
                <input
                  type="number"
                  value={formEdit.ingresos}
                  onChange={(e) => setFormEdit({ ...formEdit, ingresos: e.target.value })}
                />
                {errores.ingresos && <p className="error">{errores.ingresos}</p>}

                <div style={{ marginTop: "10px" }}>
                  <button onClick={guardarEdicion}>💾 Guardar</button>{" "}
                  <button onClick={cancelarEdicion}>❌ Cancelar</button>
                </div>
                {mensaje && <p style={{ marginTop: "8px", color: mensaje.startsWith("✅") ? "green" : "red" }}>{mensaje}</p>}
              </li>
            ) : (
              <li key={s.id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
                <strong>Monto:</strong> ${s.monto} <br />
                <strong>Motivo:</strong> {s.motivo} <br />
                <strong>Plazo:</strong> {s.plazo} meses <br />
                <strong>Ingresos:</strong> ${s.ingresos} <br />
                <strong>Estado:</strong>{" "}
                <span style={{ color: s.estado === "Aprobado" ? "green" : s.estado === "Rechazado" ? "red" : "orange" }}>
                  {s.estado}
                </span><br />
                {s.estado === "Pendiente" && (
                  <>
                    <button onClick={() => iniciarEdicion(s)}>✏️ Editar</button>{" "}
                    <button onClick={() => cancelarSolicitud(s.id)}>❌ Cancelar</button>
                  </>
                )}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default HistorialSolicitudes;

