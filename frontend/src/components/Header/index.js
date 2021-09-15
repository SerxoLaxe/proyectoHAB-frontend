import UpperLeftLogo from "../upperLeftLogo";
import SearchBar from '../SearchBar'
import UserAvatar from '../UserAvatar'
import './style.css'

const Header = () => {
  return (
    <div className='header'>
      <UpperLeftLogo />
    <SearchBar/>
    <UserAvatar/>
    </div>
  );
}

export default Header;