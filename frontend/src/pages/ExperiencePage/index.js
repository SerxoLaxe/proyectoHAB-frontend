import "./style.css";
import { useParams } from "react-router";
import Experiencia from "../../components/Experiencia";
import useExperiencia from "../../hooks/useExperiencia";
import Header from "../../components/Header";

const ExperiencePage = () => {
  const { id } = useParams();
  const [experiencia] = useExperiencia(id);

  return (
    <div className="experience-page">
      {experiencia ? (
        <Experiencia
          nombre={experiencia.nombre}
          descripcion={experiencia.descripcion}
          fecha_inicial={experiencia.fecha_inicial}
          fecha_final={experiencia.fecha_final}
          rating={experiencia.rating}
          precio={experiencia.precio}
          ubicacion={experiencia.ubicacion}
          plazas_totales={experiencia.plazas_totales}
          fotos={experiencia.fotos}
        ></Experiencia>
      ) : (
        <p>Cargando..</p>
      )}
    </div>
  );
};
export default ExperiencePage;
