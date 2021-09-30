import { useEffect, useState } from "react";

const useExperiencias = () => {
  const [experiencias, setExperiencias] = useState([]);

  useEffect(() => {
    const fetchExperiencias = async () => {
      const res = await fetch(`
      ${process.env.REACT_APP_BACKEND_URL}/experiencias`);
      if (res.ok) {
        const body = await res.json();
        console.log("body", body);
        setExperiencias(body.data);
      }
    };
    fetchExperiencias();
  }, []);

  return [experiencias, setExperiencias];
};

export default useExperiencias;
