import "./style.css";
import React, { useEffect, useState } from "react";
import Slider from "../Slider";
import useProximasExperiencias from "../../hooks/useProximasExperiencias";

function Carousel() {
  const [experiencias, loadingExperiencias] = useProximasExperiencias();
  const [data, setData] = useState([]);

  useEffect(() => {
    function getData() {
      if (!loadingExperiencias) {
        console.log("experiencias", experiencias);
        const data = experiencias.map((experiencia) => {
          const image = experiencia.thumbnails
            .split(",")[0]
            .replace("-thumbnail", "");
          return {
            image: `${process.env.REACT_APP_BACKEND_URL}/fotos/${image}`,
            id: experiencia.id,
            title: experiencia.nombre,
            description: experiencia.descripcion,
            rating: experiencia.rating,
          };
        });
        console.log("data", data);
		setData(data)
      }
    }
    getData();
  }, [loadingExperiencias]);

  

  return (
    <div className="carousel">
		{!loadingExperiencias &&  <Slider images={data} />}
     
    </div>
  );
}

export default Carousel;
