import "./style.css";
import List from "../List";

import ExperienceSmall from "../ExperienceSmall";
import useExperiencias from "../../hooks/useExperiencias";

const HomeSection = () => {
  const [experiencias] = useExperiencias();

  return (
    <div className="home_section">
      <h1>HOME SECTION</h1>
      {experiencias ? (
        <List
          className="experiences-grid"
          data={experiencias}
          render={(experiencia) => (
            <ExperienceSmall
              className="experience"
              key={experiencia.id}
              name={experiencia.nombre}
              description={experiencia.descripcion}
              rating={experiencia.rating}
              price={experiencia.precio}
              seats={experiencia.plazas_totales}
              location={experiencia.ubicacion}
              startDate={experiencia.fecha_inicial}
              endDate={experiencia.fecha_final}
              id={experiencia.id}
              thumbnails={experiencia.thumbnails}
            />
          )}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default HomeSection;
