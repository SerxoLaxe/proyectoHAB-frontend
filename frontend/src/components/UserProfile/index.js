import { useEffect, useState } from "react";
import {  Redirect } from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from '../../hooks/useUserProfile';
import EditUserForm from '../EditUserForm';
import NotFound from "../NofFound/NotFound";
import { useLocation } from "react-router";
import './style.css';
import decodeTokenData from "../../helpers/decodeTokenData";

const UserProfile = () => {
  const [token] = useUserTokenContext();
  const decodedToken = decodeTokenData(token);
  const [user, setUser] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [ownsProfile, setOwnsProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const queryString = useLocation().search;
  const searchParams = new URLSearchParams(queryString);
  const id = searchParams.get('id');

  console.log(queryString);

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
        setError("");
        const body = await res.json();
        setUser(body.data[0]);
        if (decodedToken.id === body.data[0].id){
          setOwnsProfile(true);
        }
        console.log(body.data[0]);
        if (body.data[0].activo === 0) {
          setError('Usuario borrado');
        }
        
      } else {
        const error = await res.json();
        setError(error.message);
      }
    }
    fetchUser();
    setLoading(false);
  }, [queryString]);


  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {loading
        ?
        <p>Cargando...</p>
        :
        <>
          {
            error.length > 0
              ?
              <>
                <p>{error}</p>
                <NotFound />
              </>
              :
              <div className='profile-wrapper'>
                {isEditable
                  ?
                  (<>
                    <EditUserForm data={user} />
                    <button onClick={(e) => { setIsEditable(false) }}>Cancelar</button>
                  </>)
                  :
                  <>
                    <img className='user-avatar' src={`${process.env.REACT_APP_BACKEND_URL}/${user?.avatar || 'default-avatar.jpg'}`} alt={`avatar de ${user?.nombre}`} />
                    <div className='profile-info-div'>
                      <h1>{user?.nombre}</h1>
                      <p>{user?.biografia}</p>
                      {ownsProfile && <button type='button' onClick={(e) => { setIsEditable(true) }}>Editar perfil</button>}
                    </div>
                  </>}
              </div>
          }
        </>
      }
    </>
  );
}
export default UserProfile