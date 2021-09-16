import { Link } from "react-router-dom"
import './style.css'

const Footer = () => {
  return (
    <div className='footer'>
      <Link to='/termsandconditions'>Términos y condiciones</Link>
      <Link to='/about'>Sobre nosotros</Link>
      <Link to='/contact'>Contacto</Link>
    </div>
  )
}

export default Footer;