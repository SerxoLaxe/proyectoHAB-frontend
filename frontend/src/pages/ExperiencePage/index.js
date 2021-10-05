import "./style.css";
import { useParams } from "react-router";
import Experiencia from "../../components/ExperienceSection";
import useExperiencia from "../../hooks/useExperiencia";
import useUsersPart from "../../hooks/useUsersPart";

const ExperiencePage = () => {
  const { id } = useParams();

  const [experiencia] = useExperiencia(id);
  const [participantes] = useUsersPart(id);

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
          participantes={participantes}
        ></Experiencia>
      ) : (
        <p>Cargando..</p>
      )}
    </div>
  );
};
export default ExperiencePage;
