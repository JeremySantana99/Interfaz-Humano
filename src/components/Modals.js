// Modals.js
import React, { useEffect, useRef, useState } from "react";
import "./Modals.css";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Modals({ onLogin }) {
  const [mostrarClaveLogin, setMostrarClaveLogin] = useState(false);
  const [mostrarClaveRegistro, setMostrarClaveRegistro] = useState(false);
  const [intentosLogin, setIntentosLogin] = useState(0);
  const [mensajeError, setMensajeError] = useState("");
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState("");

  const correoLoginRef = useRef(null);
  const claveLoginRef = useRef(null);

  useEffect(() => {
    document.getElementById("loginBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("modalLogin").classList.remove("oculto");
      setTimeout(() => correoLoginRef.current?.focus(), 100);
    });

    document.getElementById("registroBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      document.getElementById("modalRegistro").classList.remove("oculto");
    });

    document.addEventListener("click", (e) => {
      document.querySelectorAll(".modal").forEach((modal) => {
        if (
          !modal.classList.contains("oculto") &&
          !modal.querySelector("form").contains(e.target)
        ) {
          modal.classList.add("oculto");
          setMensajeError("");
        }
      });
    });
  }, []);

  const handlePasswordStrength = (password) => {
    let strength = "";
    if (password.length < 6) {
      strength = "Débil ❌";
    } else if (password.match(/[A-Z]/) && password.match(/[0-9]/)) {
      strength = "Fuerte ✔";
    } else {
      strength = "Media ⚠";
    }
    setPasswordStrengthLabel(strength);
  };

  const handleCancelarRegistro = () => {
    document.getElementById("modalRegistro").classList.add("oculto");
    setMensajeError("");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const correo = correoLoginRef.current.value.trim();
    const clave = claveLoginRef.current.value;

    if (correo === "admin@microcreditos.com" && clave === "admin123") {
      onLogin({ tipo: "admin", correo });
      document.getElementById("modalLogin").classList.add("oculto");
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, correo, clave);
      const userDoc = await getDoc(doc(db, "clientes", cred.user.uid));
      if (userDoc.exists()) {
        onLogin({ tipo: "cliente", correo });
        document.getElementById("modalLogin").classList.add("oculto");
        setMensajeError("");
        setIntentosLogin(0);
      } else {
        setMensajeError("Usuario no registrado como cliente.");
      }
    } catch (err) {
      setIntentosLogin((prev) => prev + 1);
      setMensajeError("Usuario o contraseña incorrectos.");
    }
  };

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const ciudad = document.getElementById("ciudad").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;
    const confirmar = document.getElementById("confirmarClave").value;

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensajeError("Correo electrónico inválido.");
      return;
    }

    if (clave !== confirmar) {
      setMensajeError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, correo, clave);
      await setDoc(doc(db, "clientes", cred.user.uid), {
        nombre,
        ciudad,
        cedula,
        correo,
      });
      onLogin({ tipo: "cliente", correo });
      document.getElementById("modalRegistro").classList.add("oculto");
      setMensajeError("");
    } catch (err) {
      setMensajeError("Error al registrarse: " + err.message);
    }
  };

  return (
    <>
      {/* Modal Iniciar Sesión */}
      <div id="modalLogin" className="modal oculto" role="dialog" aria-labelledby="loginTitle">
        <form onSubmit={handleSubmitLogin} autoComplete="on">
          <h2 id="loginTitle">Iniciar Sesión</h2>
          <label htmlFor="correoLogin">Correo:</label>
          <input
            ref={correoLoginRef}
            type="email"
            id="correoLogin"
            name="correo"
            required
            placeholder="ejemplo@correo.com"
            autoComplete="username"
          />
          <label htmlFor="claveLogin">Contraseña:</label>
          <div style={{ position: "relative" }}>
            <input
              ref={claveLoginRef}
              type={mostrarClaveLogin ? "text" : "password"}
              id="claveLogin"
              name="clave"
              required
              placeholder="********"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setMostrarClaveLogin(!mostrarClaveLogin)}
              aria-label="Mostrar/ocultar contraseña"
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {mostrarClaveLogin ? "🙈" : "👁️"}
            </button>
          </div>
          {mensajeError && <p className="error">{mensajeError}</p>}
          {intentosLogin >= 3 && (
            <p className="error">Demasiados intentos. Intenta más tarde o verifica tus datos.</p>
          )}
          <button type="submit">🔐 Ingresar</button>
        </form>
      </div>

      {/* Modal Registro */}
      <div id="modalRegistro" className="modal oculto" role="dialog" aria-labelledby="registroTitle">
        <form onSubmit={handleSubmitRegistro} autoComplete="on" aria-describedby="registroDesc">
          <h2 id="registroTitle">Registro de Usuario</h2>
          <p id="registroDesc" className="sr-only">Formulario para registrar una nueva cuenta de cliente.</p>

          <fieldset>
            <legend>Datos Personales</legend>
            <label htmlFor="nombre">Nombres completos:</label>
            <input type="text" id="nombre" name="nombre" required autoComplete="name" />

            <label htmlFor="ciudad">Ciudad:</label>
            <input type="text" id="ciudad" name="ciudad" required autoComplete="address-level2" />

            <label htmlFor="cedula">Cédula de identidad:</label>
            <input type="text" id="cedula" name="cedula" required autoComplete="off" />
          </fieldset>

          <fieldset>
            <legend>Credenciales de Acceso</legend>
            <label htmlFor="correo">Correo electrónico:</label>
            <input type="email" id="correo" name="correo" required autoComplete="email" />

            <label htmlFor="clave">Contraseña:</label>
            <input
              type={mostrarClaveRegistro ? "text" : "password"}
              id="clave"
              name="clave"
              required
              autoComplete="new-password"
              onChange={(e) => handlePasswordStrength(e.target.value)}
            />
            <div className="password-strength">{passwordStrengthLabel}</div>

            <label htmlFor="confirmarClave">Confirmar Contraseña:</label>
            <input
              type={mostrarClaveRegistro ? "text" : "password"}
              id="confirmarClave"
              name="confirmarClave"
              required
              autoComplete="new-password"
            />

            <button
              type="button"
              onClick={() => setMostrarClaveRegistro(!mostrarClaveRegistro)}
              className="toggle-pass"
              aria-label="Mostrar/ocultar contraseña"
            >
              {mostrarClaveRegistro ? "🙈 Ocultar contraseña" : "👁️ Mostrar contraseña"}
            </button>
          </fieldset>

          {mensajeError && <p className="error">{mensajeError}</p>}
          <button type="submit">📝 Registrarse</button>
          <button type="button" onClick={handleCancelarRegistro}>❌ Cancelar</button>
        </form>
      </div>
    </>
  );
}

export default Modals;
