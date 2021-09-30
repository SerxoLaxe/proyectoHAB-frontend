import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Stars from "../Stars";

//TODO: IMPORTANTE, reusar componente de Carousel de Óscar!!!!

const Experiencia = ({
  nombre,
  descripcion,
  fecha_inicial,
  fecha_final,
  rating,
  precio,
  ubicacion,
  plazas_totales,
  fotos,
}) => {
  //const [token] = UserTokenContext();
  const renderCustomThumbs = () => {
    const thumbList = fotos.map((image, index) => (
      <picture key={index}>
        <source
          data-srcSet={`${process.env.REACT_APP_BACKEND_URL}/fotos/${image.thumbnail}`}
          type="image/jpg"
        />
        <img
          key={image.id}
          src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${image.thumbnail}`}
          alt="thumbnail"
        />
      </picture>
    ));
    return thumbList;
  };

  console.log(fotos);

  return (
    <>
      <div className="experiencia">
        <div className="experiencia_info_izquierda">
          <div className="experiencia_titulo">
            {rating > 0 && <Stars rating={rating} />}
            <h2 className="experiencia_titulo">{nombre}</h2>
          </div>

          {fotos.length > 0 ? (
            <Carousel
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
              showArrows={false}
              autoPlay={true}
              renderThumbs={renderCustomThumbs}
            >
              {fotos.map((foto) => (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${foto.foto}`}
                  key={foto.id}
                  alt="Foto de la experiencia"
                />
              ))}
            </Carousel>
          ) : (
            <p>No hay fotos</p>
          )}
        </div>

        <div className="experiencia_info_derecha">
          <p className="experiencia_fechas">{`del ${new Date(
            fecha_inicial
          ).toLocaleDateString()} al ${new Date(
            fecha_final
          ).toLocaleDateString()} en ${ubicacion}`}</p>

          <div className="experiencia_plazas">
            <p className="experiencia_plazas_disponibles">{`Quedan ${plazas_totales} plazas`}</p>
            <p className="experiencia_plazas_totales">{`${plazas_totales} plazas en total`}</p>
          </div>
          <p className="experiencia_descripcion">{descripcion}</p>
          <p className="experiencia_precio">
            <h5>por</h5>
            <h2>{`${precio} €`}</h2>
            <button>Reservar</button>
          </p>
        </div>
      </div>
      <footer className="experiencia_usuarios_participantes">
        <p>Reserva plaza y acompaña en esta experiencia a...</p>
      </footer>
    </>
  );
};

export default Experiencia;
