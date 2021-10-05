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
      size: 40,
      onChange: handleRatingChange,
    }
  );
  const history = useHistory();

  useEffect(() => {
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
        size: 40,
        value: ratingValue,
      }
    )
  }

  return (
    <div className='experience-section-wrapper'>
      {!loadingExperiencia &&
        <>
          <div className="experience-title">
          <h2 className="experiencia_titulo">{experiencia.nombre}</h2>
            {experiencia.rating > 0 && <ReactStars edit={false} value={experiencia.rating} activeColor='black' color='transparent' count={4} size={30} />}
          </div>
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
              <p className="experiencia_fechas">{`del ${new Date(
                experiencia.fecha_inicial
              ).toLocaleDateString()} al ${new Date(
                experiencia.fecha_final
              ).toLocaleDateString()} en ${experiencia.ubicacion}`}</p>

              <div className="experiencia_plazas">
                <p className="experiencia_plazas_disponibles">{`${experiencia.plazas_totales - participantes.length} plazas libres`}</p>
                <p className="experiencia_plazas_totales">{`de ${experiencia.plazas_totales} plazas en total`}</p>
              </div>
              <p className="experiencia_descripcion">{experiencia.descripcion}</p>
              <div className="experiencia_precio">
                <h2>por {`${experiencia.precio} €`}</h2>
              </div>

              {loggedUser
                ?
                <>
                  {loggedUser.role === 'admin'
                    &&
                    <>
                      <button>Editar</button>
                      <button onClick={eliminarExperiencia}>Eliminar</button>
                    </>}
                  {userReservation === 'pending' && <button onClick={cancelarReserva}>Cancelar reserva</button>}
                  {userReservation === '' && <button onClick={reservarExperiencia}>Reservar</button>}
                  {userReservation === 'finished' &&
                    <>
                      <ReactStars {...ratingSelectorConfig} />
                      {userRated && <p>Ya has puntuado esta experiencia</p>}
                    </>
                  }
                </>
                :
                <p>Inicia sesión para poder realizar tu reserva.</p>
              }
          </div>
          {loggedUser && !loadingParticipantes &&
            <div className='experience-participants'>
              {participantes.length > 0
                ?
                <ParticipantsList participants={participantes} loggedUserId={loggedUser.id} userReservationState={userReservation} />
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
