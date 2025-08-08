import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Solo dejamos Router
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoCards from "./components/InfoCards";
import Modals from "./components/Modals";
import Footer from "./components/Footer";
import ClienteHome from "./pages/ClienteHome";
import AdminHome from "./pages/AdminHome";

function App() {
  const [user, setUser] = useState(null); // { tipo: "cliente" | "admin", nombre: "..." }

  const handleLogin = (credenciales) => {
    if (credenciales.correo === "admin@microcreditos.com" && credenciales.clave === "admin123") {
      setUser({ tipo: "admin", nombre: "Administrador" });
    } else {
      setUser({ tipo: "cliente", nombre: credenciales.correo });
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <Router>
      <div className="App">
        {!user && (
          <>
            <Header />
            <Hero />
            <InfoCards />
            <Modals onLogin={handleLogin} />
            <Footer />
          </>
        )}

        {user && user.tipo === "cliente" && (
          <ClienteHome nombre={user.nombre} onLogout={handleLogout} />
        )}
        {user && user.tipo === "admin" && (
          <AdminHome nombre={user.nombre} onLogout={handleLogout} />
        )}
      </div>
    </Router>
  );
}

export default App;
