import { Link } from "react-router-dom";
import './style.css'

const UpperLeftLogo = () => {
  return (
    <Link className='logo-link' to='/'>
      <img className='logo' alt='logo' src='logo.svg' />
    </Link>
  );
}

export default UpperLeftLogo;