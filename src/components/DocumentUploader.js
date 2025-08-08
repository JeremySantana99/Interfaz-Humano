import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";

function DocumentUploader({ correo }) {
  const [archivo, setArchivo] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [urls, setUrls] = useState([]);

  const manejarArchivo = (e) => setArchivo(e.target.files[0]);

  const subirArchivo = async () => {
    if (!archivo) return alert("Selecciona un archivo");

    setSubiendo(true);
    const ruta = `documentos/${correo}/${archivo.name}`;
    const archivoRef = ref(storage, ruta);

    try {
      await uploadBytes(archivoRef, archivo);
      const url = await getDownloadURL(archivoRef);
      setUrls((prev) => [...prev, url]);
      setArchivo(null);
    } catch (err) {
      alert("Error al subir: " + err.message);
    } finally {
      setSubiendo(false);
    }
  };

  const cargarArchivos = async () => {
    const carpetaRef = ref(storage, `documentos/${correo}`);
    const res = await listAll(carpetaRef);
    const links = await Promise.all(res.items.map((item) => getDownloadURL(item)));
    setUrls(links);
  };

  return (
    <div>
      <h3>📂 Mis Documentos</h3>
      <input type="file" onChange={manejarArchivo} />
      <button onClick={subirArchivo} disabled={subiendo}>
        {subiendo ? "Subiendo..." : "Subir"}
      </button>
      <button onClick={cargarArchivos}>Ver Documentos Subidos</button>
      <ul>
        {urls.map((url, idx) => (
          <li key={idx}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Documento {idx + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DocumentUploader;
