import { useEffect, useState } from "react";
const useExperiencia = (id) => {
  const [experiencia, setExperiencia] = useState(null);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    const fetchExperiencia = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}
        `
      );

      if (res.ok) {
        const body = await res.json();

        setExperiencia(body.data);
      }
      setLoading(false);
    };
    fetchExperiencia();
  }, [id]);

  return [experiencia, loading];
};

export default useExperiencia;
