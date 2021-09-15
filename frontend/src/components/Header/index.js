import UpperLeftLogo from "../upperLeftLogo";
import SearchBar from '../SearchBar'
import Avatar from '../Avatar'
import { useUserTokenContext } from '../../contexts/UserTokenContext'
import useUserProfile from "../../hooks/useUserProfile";
import './style.css'

const Header = () => {

  const [token] = useUserTokenContext();
  const [user] = useUserProfile(token);
  console.log(
    user
  );

  return (
    <div className='header'>
      <UpperLeftLogo />
      <SearchBar className='search-bar' />
      <Avatar avatar={user[0]?.avatar || null} name={user[0]?.nombre || 'Jane Doe'} />
    </div>
  );
}

export default Header;