import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./SolicitudForm.css";

function SolicitudForm({ correo }) {
  const [form, setForm] = useState({
    monto: "",
    plazo: "",
    motivo: "",
    ingresos: "",
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const err = {};
    if (!form.monto || isNaN(form.monto) || Number(form.monto) <= 0) {
      err.monto = "Ingrese un monto válido en USD.";
    }
    if (!form.plazo || isNaN(form.plazo) || form.plazo < 1 || form.plazo > 60) {
      err.plazo = "Seleccione un plazo entre 1 y 60 meses.";
    }
    if (!form.motivo || form.motivo.length < 10) {
      err.motivo = "Describa el motivo con al menos 10 caracteres.";
    }
    if (!form.ingresos || isNaN(form.ingresos) || Number(form.ingresos) <= 0) {
      err.ingresos = "Ingrese sus ingresos mensuales en USD.";
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresVal = validar();
    if (Object.keys(erroresVal).length > 0) {
      setErrores(erroresVal);
      return;
    }

    try {
      await addDoc(collection(db, "solicitudes"), {
        ...form,
        correo,
        estado: "Pendiente",
        fecha: serverTimestamp(),
      });
      setMensaje("✅ Solicitud enviada con éxito.");
      setForm({ monto: "", plazo: "", motivo: "", ingresos: "" });
      setErrores({});
      setEnviado(true);
    } catch (err) {
      console.error("Error al guardar:", err);
      setMensaje("❌ Error al guardar la solicitud. Intente nuevamente.");
    }
  };

  const handleCancelar = () => {
    setForm({ monto: "", plazo: "", motivo: "", ingresos: "" });
    setErrores({});
    setMensaje("");
  };

  return (
    <div className="formulario-solicitud">
      <h2>📝 Solicitud de Crédito</h2>
      <p>Completa los siguientes campos para procesar tu solicitud.</p>
      <form onSubmit={handleSubmit} aria-label="Formulario solicitud crédito">
        {/* Grupo: Datos del crédito */}
        <fieldset>
          <legend>📌 Datos del crédito</legend>

          <label htmlFor="monto">Monto solicitado (USD): <span className="obligatorio">*</span></label>
          <input
            id="monto"
            name="monto"
            type="number"
            min="1"
            placeholder="Ej. 1000"
            value={form.monto}
            onChange={handleChange}
          />
          {errores.monto && <p className="error">{errores.monto}</p>}

          <label htmlFor="plazo">Plazo (meses): <span className="obligatorio">*</span></label>
          <select
            id="plazo"
            name="plazo"
            value={form.plazo}
            onChange={handleChange}
          >
            <option value="">Seleccione</option>
            {[...Array(60)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1} meses</option>
            ))}
          </select>
          {errores.plazo && <p className="error">{errores.plazo}</p>}
        </fieldset>

        {/* Grupo: Justificación financiera */}
        <fieldset>
          <legend>📄 Justificación financiera</legend>

          <label htmlFor="motivo">Motivo del crédito: <span className="obligatorio">*</span></label>
          <textarea
            id="motivo"
            name="motivo"
            rows="4"
            placeholder="Ej. Ampliar mi negocio de venta de productos naturales..."
            value={form.motivo}
            onChange={handleChange}
          />
          {errores.motivo && <p className="error">{errores.motivo}</p>}

          <label htmlFor="ingresos">Ingresos mensuales (USD): <span className="obligatorio">*</span></label>
          <input
            id="ingresos"
            name="ingresos"
            type="number"
            placeholder="Ej. 500"
            value={form.ingresos}
            onChange={handleChange}
          />
          {errores.ingresos && <p className="error">{errores.ingresos}</p>}
        </fieldset>

        <div className="botones">
          <button type="submit">📤 Enviar Solicitud</button>
          <button type="button" onClick={handleCancelar}>❌ Cancelar</button>
        </div>

        {mensaje && <p className={enviado ? "exito" : "error"}>{mensaje}</p>}
      </form>
    </div>
  );
}

export default SolicitudForm;
