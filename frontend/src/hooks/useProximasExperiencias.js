import { useEffect, useState } from "react";

const useProximasExperiencias = () => {
  const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    const fechaActual = new Date();
    const fechaInicial = fechaActual.toISOString().split(`T`)[0];

    const fechaFinal = new Date(fechaActual);
    fechaFinal.setDate(fechaActual.getDate() + 30);

    const fechaFinalString = fechaFinal.toISOString().split(`T`)[0];

    const fetchExperiencias = async () => {
      const res = await fetch(`
      ${process.env.REACT_APP_BACKEND_URL}/experiencias/search?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinalString}`);
      if (res.ok) {
        const body = await res.json();

        setExperiencias(body.data);
      }
    };
    fetchExperiencias();
  }, []);

  return [experiencias, setExperiencias];
};

export default useProximasExperiencias;
