import { Link } from "react-router-dom"
import './style.css'

const Footer = () => {
  return (
    <div className='footer'>
      <ul className='footer-list'>
        <li>
          <Link to='/termsandconditions'>Términos y condiciones</Link>
        </li>
        <li>
          <Link to='/about'>Sobre nosotros</Link>
        </li>
        <li>
          <Link to='/contact'>Contacto</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer;