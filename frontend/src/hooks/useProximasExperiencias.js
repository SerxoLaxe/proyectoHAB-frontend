import { useEffect, useState } from "react"
/**
 * Hook que realiza una petición que devuelve las experiencias con fecha de inicio entre el día actual y los próximos 30 días.
 * @returns 
 */
const useProximasExperiencias = () => {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const queryParams = new URLSearchParams();
    const fechaInicialDate = new Date();
    const fechaFinal = new Date(fechaInicialDate);

    //Creamos otra fecha y le añadimos 30 días o el tiempo pertinente.
    fechaFinal.setDate(fechaInicialDate.getDate() + 365);
    const fechaInicialString = fechaInicialDate.toISOString().split('T')[0];
    const fechaFinalString = fechaFinal.toISOString().split('T')[0];
    queryParams.append('fechaInicial', fechaInicialString);
    queryParams.append('fechaFinal', fechaFinalString);
    async function fetchExperiencias() {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/search?${queryParams.toString()}`
      );

      if (res.ok) {
        const body = await res.json();
        setExperiencias(body.data);
      }
      setLoading(false);
    }
    fetchExperiencias();
  }, []);

  return [experiencias, loading]
}

export default useProximasExperiencias;