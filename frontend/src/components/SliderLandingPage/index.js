import React from 'react'
import './style.css';
import { useState, useEffect } from 'react';
import useProximasExperiencias from '../../hooks/useProximasExperiencias';
import { useHistory } from 'react-router';
import ReactStars from 'react-rating-stars-component';


const SliderLandingPage = () => {

  const [experiencias, loadingExperiencias] = useProximasExperiencias();
  const [data, setData] = useState([]);
  const [currentExperience, setCurrentExperience] = useState(0);
  const history = useHistory();

  useEffect(() => {
    function getData() {
      if (!loadingExperiencias) {

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
            price: experiencia.precio,
          };
        });

        setData(data)
      }
    }
    getData();
  }, [experiencias, loadingExperiencias]);

  // Este useEffect crea un intervalo que itera el array de experiencia, cambiando el index de los datos con los que se debe renderizar el componente.
  useEffect(() => {
    const intervalId = setInterval(() => {

      if (currentExperience === (data.length - 1)) {
        setCurrentExperience(0);
      } else {
        setCurrentExperience(currentExperience => currentExperience + 1);
      }
    }, 20000)
    return () => { clearInterval(intervalId) }
  }, [currentExperience, data]);

  return (
    <section className='slider-wrapper'>

      {data.length > 0
        ?
        <div key={data[currentExperience].id} className='slider-item' onClick={() => { history.push(`/app/experience/${data[currentExperience].id}`) }}>
          <img src={data[currentExperience].image} alt={data[currentExperience].title} />
          <div className='slider-item-info'>
            <div className='slider-item-info-top'>
              <div className='slider-item-left-side'>
                <h1 className='slider-item-title'>{data[currentExperience].title}</h1>
                <ReactStars value={data[currentExperience].rating} edit={false} activeColor='white' color='transparent' count={4} size={30} />
              </div>
              <p className='slider-item-price'>{data[currentExperience].price}€</p>
            </div>

            <p className='slider-item-description'>{data[currentExperience].description}</p>
          </div>
        </div>
        :
        <p>cargando...</p>}
    </section>
  )
}

export default SliderLandingPage;
