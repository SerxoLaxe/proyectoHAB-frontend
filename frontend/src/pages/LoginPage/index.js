import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import './style.css';


const LoginPage = () => {
  return (
    <div className='login-page'>
      <Logo className='logo' />
      <LoginForm name='loginform' />
      <Footer name='footer' />

    </div>
  );
}

export default LoginPage