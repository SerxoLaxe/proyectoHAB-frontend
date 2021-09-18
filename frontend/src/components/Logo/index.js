import { useHistory } from 'react-router';
import './style.css'

const Logo = () => {
  const history = useHistory();
  return (
      <img className='logo' alt='logo' src='logo.svg' onClick={()=>{
        history.push('/');
      }}/>
  );
}

export default Logo;