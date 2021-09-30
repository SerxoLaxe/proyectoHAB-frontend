import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import EditUserForm from '../EditUserForm';
import decodeTokenData from "../../helpers/decodeTokenData";
import './style.css';
import FormError from "../FormError";
import NotFound from '../NotFound'

const UserProfile = () => {
  const { id } = useParams();
  const [token] = useUserTokenContext();
  const [user, setUser] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [owsProfile, setOwnsProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');

  // FIXME - Esto debería de ser un hook, al menos el fetch.
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/usuarios/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      if (res.ok) {
        //setError("");
        const body = await res.json();
        setUser(body.data[0]);

        //Comprobamos que si el usuario logueado se corresponde con el accedido.
        const decodedToken = decodeTokenData(token);
        if(decodedToken.id === body.data[0].id){
          setOwnsProfile(true);
        }
        

      } else {
        const error = await res.json();
        setError(error.message);
      }
      setLoadingProfile(false);
    }
    fetchUser();
  }, [id, token]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  if ( !loadingProfile && user.length > 0 && user.activo === 0){
    return <NotFound/>
  }

  return (
    <>
      {!loadingProfile
        ?
        <div className='profile-wrapper'>

          {isEditable
            ?
            (<>
              <EditUserForm data={user} />
              <button onClick={(e) => { setIsEditable(false) }}>Cancelar</button>
            </>)
            :
            <>
              <img className='user-avatar' src={`${process.env.REACT_APP_BACKEND_URL}/fotos/${user?.avatar || 'default-avatar.jpg'}`} alt={`avatar de ${user?.nombre}`} />
              <div className='profile-info-div'>
                <h1>{user?.nombre}</h1>
                <p>{user?.biografia}</p>
                {owsProfile && <button type='button' onClick={(e) => { setIsEditable(true) }}>Editar perfil</button>}
              </div>
            </>}
            {error.length > 0 && <FormError error={error}/>}

        </div>
        :
        <p>Cargando...</p>}
    </>
  );
}
export default UserProfile