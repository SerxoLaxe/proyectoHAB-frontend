import { useHistory } from "react-router";
import Stars from "../Stars";
import "./style.css";
import SliderFotos from "../SliderFotos";

const ExperienceSmall = ({
  index,
  name,
  description,
  rating,
  price,
  seats,
  id,
  fotos,
}) => {
  const history = useHistory();

  return (
    <div
      className="div-experience"
      key={index}
      onClick={() => {
        history.push(`app/experience/${id}`);
      }}
    >
      {fotos.length > 0 && (
        <SliderFotos experienceFotos={fotos} className="thumbnail-div" />
      )}
      <div className="info-div">
        <h1 className="title">{name}</h1>

        <div className="info-box">
          <div className="left-info-box">
            <p className="description">{description}</p>
          </div>

          <div className="right-info-box">
            {rating > 0 && <Stars rating={rating} />}
            <p className="seats-experience">{seats} plazas disponibles</p>
            <p className="price-experience">{price}€</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSmall;
