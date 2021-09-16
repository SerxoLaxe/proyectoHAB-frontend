import Logo from "../Logo";
import SearchBar from '../SearchBar'
import Avatar from '../Avatar'
import { useUserTokenContext } from '../../contexts/UserTokenContext'
import useUserProfile from "../../hooks/useUserProfile";
import './style.css'
import { useHistory } from "react-router";

const Header = () => {

  const [token] = useUserTokenContext();
  const [user] = useUserProfile(token);
  console.log(
    user
  );
  const history = useHistory();

  return (
    <div className='header'>
      <Logo />
      <SearchBar className='search-bar' />
      {user.length > 0
        ?
        <Avatar avatar={user[0]?.avatar || null} name={user[0]?.nombre || 'Jane Doe'} id={user[0]?.id} />
        :
        <button onClick={() => { history.push(`/login`) }}>Iniciar sesión</button>}
    </div>
  );
}

export default Header;