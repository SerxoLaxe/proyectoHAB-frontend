import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useParams, useHistory } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import useExperiencia from "../../hooks/useExperiencia";
import useUsersPart from "../../hooks/useUsersPart";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import decodeTokenData from "../../helpers/decodeTokenData";
import { useEffect, useState } from "react";
import ParticipantsList from "../ParticipantsList";

const ExperienceSection = () => {
  const { id } = useParams();
  const [experiencia, loadingExperiencia] = useExperiencia(id);
  const [participantes, loadingParticipantes] = useUsersPart(id);
  const [token] = useUserTokenContext();
  const [loggedUser, setloggedUser] = useState();
  const [userReservation, setUserReservation] = useState(''); //
  const [userRated, setUserRated] = useState();
  const [ratingSelectorConfig, setRatingSelectorConfig] = useState(
    {
      edit: true,
      count: 4,
      activeColor: 'black',
      size: 80,
      onChange: handleRatingChange,
    }
  );
  const [experienceFinished, setExperienceFinished] = useState(false);
  const history = useHistory();

  useEffect(() => {

    function isExperienceFinished() {
      if (new Date(experiencia.fecha_final) <= new Date) {
        console.log('premio');
        setExperienceFinished(true);
      }
    }
    // Esta función marca el estado de la reserva.
    function setReservationState() {

      // Manejamos la identidad del usuario logueado.
      const decodedToken = decodeTokenData(token);
      setloggedUser(decodedToken);

      // Controlamos si el usuario tiene reserva y si está ya se ha agotado ( experiencia ya disfrutada).
      if (participantes.length > 0) {
        //const experienceStartDate = new Date(experiencia.fecha_inicial);
        const experienceEndingDate = new Date(experiencia.fecha_final);
        const currentDate = new Date();
        participantes.forEach((participante) => {
          if (participante.id_usuario === decodedToken.id) {
            if (experienceEndingDate <= currentDate) {
              setUserReservation('finished');
              checkIfUserAlreadyRated();
            } else {
              setUserReservation('pending');
            }
          }
        });
      }

      function checkIfUserAlreadyRated() {

        // Comprobamos si la experiencia ha sido ya puntuada por el usuario
        if (experiencia.puntuaciones.length > 0) {
          experiencia.puntuaciones.forEach((puntuacion) => {
            if (puntuacion.id_usuario === decodedToken.id) {
              setUserRated(puntuacion.puntuacion);
              setRatingSelectorConfig(
                {
                  edit: false,
                  count: 4,
                  activeColor: 'black',
                  size: 40,
                  value: puntuacion.puntuacion,
                })
            }
          })
        }
      }
    }
    if (token && !loadingExperiencia && !loadingParticipantes) {
      isExperienceFinished();
      setReservationState();
    }
  }, [token, participantes, experiencia, loadingExperiencia, loadingParticipantes]);

  // Esta función pregunta mediante un confirm al usuario si desea realizar una reserva de la experiencia, lo ejecuta en caso afirmativo y recarga la página.
  function reservarExperiencia() {
    async function fecthReservarExperiencia() {
      console.log('reservar');
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}/reservar`,
        {
          method: 'POST',
          headers: {
            token: token
          }
        });
      if (res.ok) {
        setUserReservation('pending');
      }
    }
    const userInput = window.confirm('Estás seguro que deseas reservar esta experiencia?');
    if (userInput) {
      fecthReservarExperiencia();
      window.location.reload(false);
    }

  }

  // Esta función pregunta mediante un confirm si el usuario desea cancelar su reserva, lo realiza en caso afirmativo y recarga la página.
  async function cancelarReserva() {
    async function fetchCancelarExperiencia() {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}/cancelar`,
        {
          method: 'DELETE',
          headers: {
            token: token
          }
        });
      if (res.ok) {
        setUserReservation('');
      }
    }
    const userInput = window.confirm('Estás seguro que deseas cancelar tu reserva de esta experiencia?');
    if (userInput) {
      fetchCancelarExperiencia();
      window.location.reload(false);
    }
  }

  function eliminarExperiencia() {
    async function fetchEliminarExperiencia() {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}`,
        {
          method: 'DELETE',
          headers: {
            token: token,
          }
        })
    }

    const userInput = window.confirm('Estás seguro de que quieres eliminar esta experiencia?');
    if (userInput) {
      fetchEliminarExperiencia();
      history.push('/app')
    }
  }

  function handleRatingChange(ratingValue) {
    setUserRated(ratingValue);
    async function fecthRateExperience() {
      const formData = new FormData();
      formData.append('puntuacion', ratingValue);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}/puntuar`,
        {
          method: 'POST',
          headers: {
            token: token,
          },
          body: formData,
        });
      if (res.ok) {
        console.log('puntuaste:', ratingValue, 'estrellas');
      }
    }
    fecthRateExperience();
    setRatingSelectorConfig(
      {
        edit: false,
        count: 4,
        activeColor: 'black',
        size: 80,
        value: ratingValue,
      }
    )
  }

  return (
    <div className='experience-section-wrapper'>
      {!loadingExperiencia &&
        <>
          <div className="experience-carrousel">
            {experiencia.fotos.length > 0 ? (
              <Carousel
                infiniteLoop={true}
                showStatus={false}
                showIndicators={false}
                showArrows={false}
                autoPlay={false}
              >
                {experiencia.fotos.map((foto) => (
                  <img
                    className='experience-image'
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

          <div className='experience-info'>
            <div className="experience-title">
              <h1 className="experiencia_titulo">{experiencia.nombre}</h1>
              {experiencia.rating > 0 && <ReactStars edit={false} value={experiencia.rating} activeColor='black' color='transparent' className='react-stars' count={4} size={30} />}
            </div>
            <div className="experience-dates">
              <div>
                <img alt='calendar-logo' src='/calendar.svg' />
                <p>{!experienceFinished
                  ?
                  `del ${new Date(experiencia.fecha_inicial).toLocaleDateString()} al ${new Date(experiencia.fecha_final).toLocaleDateString()} `
                  :
                  'FINALIZADA'}</p>
              </div>
              <div>
                <img alt='place-logo' src='/place-point.svg' />
                <p>{`en ${experiencia.ubicacion}`}</p>
              </div>
            </div>

            <div className="experience-seats">
              <div className="available-seats">
                <p >{`${experiencia.plazas_totales - participantes.length} plazas libres`}</p>
              </div>
              <div className="total-seats">
                <p >{`de ${experiencia.plazas_totales} plazas en total`}</p>
              </div>
            </div>
            <p className="experience-description">{experiencia.descripcion}</p>
            <div className="experience-price">
              <h2>por {`${experiencia.precio} €`}</h2>
            </div>
            <div className='experience-variable-elements'>
              {loggedUser
                ?
                <>
                  {loggedUser.role === 'admin'
                    &&
                    <>
                      <button onClick={() => { history.push(`/app/edit-experience/${id}`) }}>Editar</button>
                      <button onClick={eliminarExperiencia}>Eliminar</button>
                    </>}{!experienceFinished &&
                      <>
                        {userReservation === 'pending' && <button onClick={cancelarReserva}>Cancelar reserva</button>}
                        {userReservation === '' && <button onClick={reservarExperiencia}>Reservar</button>}
                      </>}

                  {userReservation === 'finished' &&
                    <div className='rating-section'>
                      {userRated ? <p>Ya has puntuado esta experiencia</p> : <p>Puntúa tu experiencia</p>}
                      <ReactStars className='react-stars'{...ratingSelectorConfig} />
                    </div>
                  }
                </>
                :
                <p>Inicia sesión para poder realizar tu reserva.</p>
              }
            </div>
          </div>
          {loggedUser && !loadingParticipantes &&
            <div className='experience-participants'>
              {participantes.length > 0
                ?
                <ParticipantsList participants={participantes} loggedUserId={loggedUser.id} userReservationState={userReservation} experienceFinished={experienceFinished} />
                :
                <p>Todavía no hay nadie apuntado</p>
              }
            </div>
          }
        </>}
    </div>
  );
};

export default ExperienceSection;
