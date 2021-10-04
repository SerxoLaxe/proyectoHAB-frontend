const ParticipantsList = ({ participants, loggedUserId , userReservationState}) => {
  return (
      <>
        {participants.filter((e) => e.id_usuario !== loggedUserId).length > 0 // Esto comprueba si el usuario logueado es el único participante.
          ?
          <ul>
            {userReservationState === 'pending' && <p>Tendrás de compañeros a</p>}
            {userReservationState === 'finished' && <p>Acompañaste en esta experiencia a</p>}
            {userReservationState.length === 0 && <p>Reserva plaza y acompaña en esta experiencia a...</p>}
            
            {participants.map((participante) => {
              if (participante.id_usuario !== loggedUserId) {
                return (
                  <li key={participante.id} className="experiencia_participante">
                    {participante.avatar ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${participante.avatar}`}
                        alt="avatar_participante"
                      />
                    ) : null}
                    <p className="nombre_participante">{participante.nombre}</p>
                  </li>)
              } else return null;
            })}
          </ul>
          :
          <>
          {userReservationState === 'finished' && <p>Parece que fuiste el único participante</p>}
          {userReservationState === 'pending' && <p>Por ahora eres el único que está apuntado.</p>}
          </>
          }
          
      </>
   
  )
}

export default ParticipantsList;