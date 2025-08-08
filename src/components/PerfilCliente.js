import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function PerfilCliente({ correo }) {
  const [perfil, setPerfil] = useState(null);
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", ciudad: "", cedula: "" });

  useEffect(() => {
    const cargarPerfil = async () => {
      const usuariosRef = doc(db, "clientes", correo);
      const docSnap = await getDoc(usuariosRef);
      if (docSnap.exists()) {
        setPerfil(docSnap.data());
        setFormData({
          nombre: docSnap.data().nombre || "",
          ciudad: docSnap.data().ciudad || "",
          cedula: docSnap.data().cedula || ""
        });
      }
    };
    cargarPerfil();
  }, [correo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const guardarCambios = async () => {
    const ref = doc(db, "clientes", correo);
    await updateDoc(ref, formData);
    setPerfil({ ...perfil, ...formData });
    setEditando(false);
  };

  if (!perfil) return <p>Cargando datos...</p>;

  return (
    <div>
      <h3>🧍 Mi Perfil</h3>
      {!editando ? (
        <>
          <p><strong>Nombre:</strong> {perfil.nombre}</p>
          <p><strong>Ciudad:</strong> {perfil.ciudad}</p>
          <p><strong>Cédula:</strong> {perfil.cedula}</p>
          <p><strong>Correo:</strong> {correo}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
        </>
      ) : (
        <>
          <label>Nombre:</label>
          <input id="nombre" value={formData.nombre} onChange={handleChange} />
          <label>Ciudad:</label>
          <input id="ciudad" value={formData.ciudad} onChange={handleChange} />
          <label>Cédula:</label>
          <input id="cedula" value={formData.cedula} onChange={handleChange} />
          <button onClick={guardarCambios}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      )}
    </div>
  );
}

export default PerfilCliente;
