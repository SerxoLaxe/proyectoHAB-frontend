import { Link } from "react-router-dom";
import './style.css'

const Logo = () => {
  return (
    <Link className='logo-link' to='/'>
      <img className='logo' alt='logo' src='logo.svg' />
    </Link>
  );
}

export default Logo;