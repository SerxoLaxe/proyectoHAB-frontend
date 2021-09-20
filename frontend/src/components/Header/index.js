import Logo from "../Logo";
import SearchBar from '../SearchBar'
import Avatar from '../Avatar'
import { useUserTokenContext } from '../../contexts/UserTokenContext'
import useUserProfile from "../../hooks/useUserProfile";
import './style.css'
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

const Header = () => {

  const [token] = useUserTokenContext();
  const [user] = useUserProfile(token);
  const history = useHistory();
  const [userRol, setUserRol] = useState('');

  useEffect(() => {
    if (typeof user !== 'undefined' && user.length > 0) {
      setUserRol(user[0].privilegios);
    }
  }, [user])


  return (
    <div className='header'>
      <Logo />
      <SearchBar />

      {userRol === 'admin' &&
        <button type='button' onClick={() => { history.push('/new-experience') }}>Añadir experiencia</button>}

      {user.length > 0
        ?
        <Avatar avatar={user[0]?.avatar || null} name={user[0]?.nombre || 'Jane Doe'} id={user[0]?.id} className='right-button' />
        :
        <button type='button' className='right-button' onClick={() => { history.push(`/login`) }}>Iniciar sesión</button>}
    </div>
  );
}

export default Header;