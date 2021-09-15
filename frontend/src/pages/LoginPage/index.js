import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import UpperLeftLogo from "../../components/upperLeftLogo";
import './style.css';


const LoginPage = () => {
  return (
    <div className='login-page'>
      <UpperLeftLogo className='logo' />
      <LoginForm className='loginform' />
      <Footer className='footer' />

    </div>
  );
}

export default LoginPage