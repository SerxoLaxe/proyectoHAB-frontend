import { useHistory } from "react-router";
const ExperienceSmall = ({
  index,
  name,
  description,
  rating,
  price,
  seats,
  startDate,
  endDate,
  location,
  id
}) => {
  const history = useHistory();
  return (
    <div key={index} onClick={() => {
      history.push(`/experience/${id}`)
    }}>
      <h1>{name}</h1>
      <p>Descripción: {description}</p>
      <p>Rating: {rating}</p>
      <p>Precio: {price}</p>
      <p>Asientos: {seats}</p>
      <p>Fecha inicial:{startDate}</p>
      <p>Fecha final:{endDate}</p>
      <p>ubicacion: {location}</p>
    </div>
  );
}

export default ExperienceSmall;