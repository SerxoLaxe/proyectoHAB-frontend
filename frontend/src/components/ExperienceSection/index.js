import "./style.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useParams, useHistory } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import Stars from '../Stars';
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
  const history = useHistory();

  useEffect(() => {
    // Esta función marca el estado de la reserva.
    function setReservationState() {

      // Manejamos la identidad del usuario logueado.
      const decodedToken = decodeTokenData(token);
      setloggedUser(decodedToken);

      // Controlamos si el usuario tiene reserva y si está ya se ha agotado ( experiencia ya disfrutada).
      const experienceStartDate = new Date(experiencia.fecha_inicial);
      const experienceEndingDate = new Date(experiencia.fecha_final);

      if (participantes.length > 0) {
        participantes.forEach((participante) => {
          if (participante.id_usuario === decodedToken.id) {
            if (experienceEndingDate <= new Date()) {
              setUserReservation('finished');
              console.log('experiencia terminada, ahora puedes puntuarla');
            } else if (experienceStartDate <= new Date() && experienceEndingDate >= new Date()) {
              setReservationState('underway')
              console.log('Experiencia en curso, ya no se puede cancelar la reserva');
            } else {
              setUserReservation('pending');
              console.log('Experiencia pendiente de ser realizada');
            }
          }
        });
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiencias/${id}`,
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

  function handleRatingChange(newRating) {
    console.log(newRating);
    setUserRated(newRating);
  }

  return (
    <>
      {!loadingExperiencia && <div className="experience-wrapper">
        <div className='experience-info'>
          <div className="experiencia_info_izquierda">
            <div className="experiencia_titulo">
              {experiencia.rating > 0 && <Stars rating={experiencia.rating} />}
              <h2 className="experiencia_titulo">{experiencia.nombre}</h2>
            </div>

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
              experiencia.fecha_inicial
            ).toLocaleDateString()} al ${new Date(
              experiencia.fecha_final
            ).toLocaleDateString()} en ${experiencia.ubicacion}`}</p>

            <div className="experiencia_plazas">
              <p className="experiencia_plazas_disponibles">{`${experiencia.plazas_totales - participantes.length} plazas cubiertas`}</p>
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
                  <ReactStars activeColor='black' size={40} onChange={handleRatingChange} />}
              </>
              :
              <p>Inicia sesión para poder realizar tu reserva.</p>
            }
          </div>
        </div>
      </div>}

      {loggedUser && !loadingParticipantes &&
        <>
          {participantes.length > 0
            ?
            <ParticipantsList participants={participantes} loggedUserId={loggedUser.id} userReservationState={userReservation} />
            :
            <p>Todavía no hay nadie apuntado</p>
          }
        </>
      }
    </>
  );
};

export default ExperienceSection;
