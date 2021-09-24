import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import useUserProfile from '../../hooks/useUserProfile';
import EditUserForm from '../EditUserForm';
import './style.css';

const UserProfile = () => {
  const { id } = useParams();
  const [token] = useUserTokenContext();
  const [loggedUser] = useUserProfile(token);
  const [user, setUser] = useState();
  const [isEditable, setIsEditable] = useState(false);


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
      } else {
        // const error = await res.json();
        //setError(error.message);
      }
    }

    fetchUser();
  }, [id, token]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return (
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
            <button type='button' onClick={(e) => { setIsEditable(true) }}>Editar perfil</button>
          </div>
        </>}

    </div>
  );
}
export default UserProfile