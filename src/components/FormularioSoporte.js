import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./FormularioSoporte.css";

function FormularioSoporte({ correo }) {
  const [form, setForm] = useState({
    tipo: "Técnico",
    asunto: "",
    descripcion: "",
    captcha: false,
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const validar = () => {
    const errs = {};
    if (!form.asunto.trim()) errs.asunto = "Debe ingresar un asunto.";
    if (!form.descripcion.trim()) errs.descripcion = "Debe describir el problema.";
    if (!form.captcha) errs.captcha = "Por favor marque la verificación antispam.";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nuevoValor }));
  };

  const enviarSoporte = async (e) => {
    e.preventDefault();
    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    try {
      await addDoc(collection(db, "soporte"), {
        ...form,
        correo,
        estado: "Pendiente",
        fecha: Timestamp.now(),
      });
      setMensaje("✅ Tu mensaje fue enviado con éxito. Responderemos en 24 horas.");
      setForm({ tipo: "Técnico", asunto: "", descripcion: "", captcha: false });
      setErrores({});
      setEnviado(true);
    } catch (error) {
      setMensaje("❌ Error al enviar: " + error.message);
    }
  };

  return (
    <div className="formulario-soporte">
      <h2>💬 Soporte al Cliente</h2>
      <p>¿Tienes alguna duda o problema? Rellena el siguiente formulario y nuestro equipo se pondrá en contacto contigo en menos de 24 horas.</p>
      <form onSubmit={enviarSoporte} aria-label="Formulario de contacto de soporte">
        <label htmlFor="tipo">Tipo de problema:</label>
        <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange}>
          <option>Técnico</option>
          <option>Financiero</option>
          <option>Consulta general</option>
        </select>

        <label htmlFor="asunto">Asunto:</label>
        <input
          id="asunto"
          name="asunto"
          type="text"
          value={form.asunto}
          onChange={handleChange}
          placeholder="Ej. Error al simular crédito"
          aria-required="true"
        />
        {errores.asunto && <span className="error">{errores.asunto}</span>}

        <label htmlFor="descripcion">Mensaje:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          rows="5"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Describe con detalle tu problema o consulta..."
          aria-required="true"
        />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}

        <div className="captcha">
          <input
            id="captcha"
            type="checkbox"
            name="captcha"
            checked={form.captcha}
            onChange={handleChange}
          />
          <label htmlFor="captcha">No soy un robot</label>
        </div>
        {errores.captcha && <span className="error">{errores.captcha}</span>}

        <div className="botones">
          <button type="submit">📩 Enviar</button>
          <button type="button" onClick={() => setForm({ tipo: "Técnico", asunto: "", descripcion: "", captcha: false })}>
            ❌ Cancelar
          </button>
        </div>

        {mensaje && <p className={enviado ? "exito" : "error"}>{mensaje}</p>}
      </form>
    </div>
  );
}

export default FormularioSoporte;
