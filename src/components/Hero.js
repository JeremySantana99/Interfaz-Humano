import React, { useEffect, useState } from "react";
import "./Hero.css";

const frases = [
  "Microcréditos Solidarios",
  "Trabajando por ti",
  "Tu esfuerzo, nuestro impulso"
];

function Hero() {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % frases.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="hero">
      <h1 className="frase-animada">{frases[indice]}</h1>
    </section>
  );
}

export default Hero;