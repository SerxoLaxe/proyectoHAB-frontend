import './style.css';
import { useHistory } from 'react-router';

const ParticipantsList = ({ participants, loggedUserId, userReservationState, experienceFinished }) => {
  const history = useHistory();

  return (
    <div className='participant-component'>
      {participants.filter((e) => e.id_usuario !== loggedUserId).length > 0 // Esto comprueba si el usuario logueado es el único participante.
        ?
        <>
          {!experienceFinished
            ?
            <>
              {userReservationState === 'pending' && <p>Tendrás de compañeros a</p>}
              {(userReservationState === 'finished' || experienceFinished) && <p>Acompañaste en esta experiencia a</p>}
              {userReservationState.length === 0 && <p>Reserva plaza y acompaña en esta experiencia a</p>}
            </>
            :
            <p>Participarion en esta experiencia</p>}

          <ul className="participant-list">
            {participants.map((participante) => {
              if (participante.id_usuario !== loggedUserId) {
                return (
                  <li key={participante.id} onClick={() => { history.push(`/app/user/${participante.id_usuario}`) }}>
                    {participante.avatar ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${participante.avatar}`}
                        alt="avatar_participante"
                      />
                    ) : null}
                    {/* <p className="nombre_participante">{participante.nombre.split(' ')[0]}</p> */}
                  </li>)
              } else return null;
            })}
          </ul>
        </>
        :
        <>
          {userReservationState === 'finished' && <p>Parece que fuiste el único participante</p>}
          {userReservationState === 'pending' && <p>Por ahora eres el único que está apuntado.</p>}
        </>
      }

    </div>

  )
}

export default ParticipantsList;