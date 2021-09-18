import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import './style.css'

const ExperienceSmall = ({
  index,
  name,
  description,
  rating,
  price,
  seats,
  id,
  thumbnails
}) => {
  const history = useHistory();
  const [thumbs, setThumbs] = useState([]);
  const [currentThumb, setCurrentThumb] = useState(0);

  useEffect(() => {
    setThumbs(() => {
      if (typeof thumbnails !== 'undefined' && thumbnails !== null) {
        return thumbnails.split(',');
      }
      return []
    });
    setCurrentThumb(0);
  }, [thumbnails]);


  return (
    <div className='div-experience' key={index} onClick={() => {
      history.push(`/experience/${id}`)
    }}>

      <div className='thumbnail-div'>
        {thumbs.length > 0 && <img className='thumbnail' src={`${process.env.REACT_APP_BACKEND_URL}/${thumbs[currentThumb]}`} alt='thumbnail' />}
      </div>
      <div className='info-div'>
        <h1 className='title'>{name}</h1>
        <div className='info-box'>
          <div className='left-info-box'>
            <p className='description'>{description}</p>
          </div>

          <div className='right-info-box'>
            <p>Rating: {rating}</p>
            <p>Asientos: {seats}</p>
            <p>{price} euros</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ExperienceSmall;