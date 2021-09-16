import {useHistory} from 'react-router-dom';
import { useUserTokenContext } from '../../contexts/UserTokenContext';

import './style.css'


const AvatarMenu = ({ userName, id }) => {
  const [token, setToken] = useUserTokenContext();
  const history = useHistory();
  return (
    <div className='avatar-menu'>
      <ul className='avatar-menu-list'>
        <li key='1'>
          <p id='user-name'>{userName}</p>
        </li>
        <li key='2'>
          <button onClick={()=>{history.push(`/users/${id}`)}}> 
            Perfil
          </button>
        </li>
        <li key='3'>
          <button onClick={()=>{
            if (token){
              setToken('');
              history.push('/');
            }
          }}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
}
export default AvatarMenu;