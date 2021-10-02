import useProximasExperiencias from "../../hooks/useProximasExperiencias";
import List from "../List";
import ExperienceSmall from "../ExperienceSmall";

const HomeSection = () => {
  const [experiencias, loadingExperiencias] = useProximasExperiencias();

  return (
    <div>
      <div className="search-result-wrapper">
        <h2>Próximos eventos</h2>
        {!loadingExperiencias ? (
          <>
            {experiencias.length > 0 ? (
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
                    id={experiencia.id}
                    thumbnails={experiencia.thumbnails}
                  />
                )}
              />
            ) : (
              <p>No hay resultados</p>
            )}
          </>
        ) : (
          <p>Cargango ...</p>
        )}
      </div>
    </div>
  );
};

export default HomeSection;
