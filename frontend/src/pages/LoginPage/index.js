import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import './style.css';
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className='login-page'>
      <Link className='logo' to='/'>
        <img className='logo' alt='logo' src='logo.svg' />
        </Link>

      <LoginForm className='loginform' />
      <Footer className='footer' />
    </div>
  );
}

export default LoginPage