import "./style.css";
const SliderFotos = ({ experienceFotos }) => {
  return (
    <ul className="slider_fotos">
      {experienceFotos.map((foto) => {
        return (
          <li>
            <img
              key={foto.id}
              src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${foto.thumbnail}`}
              alt="Foto de la experiencia"
              className="experiencia_foto"
            ></img>
          </li>
        );
      })}
    </ul>
  );
};
export default SliderFotos;
