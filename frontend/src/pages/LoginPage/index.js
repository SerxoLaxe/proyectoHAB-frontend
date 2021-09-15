import LoginForm from "../../components/LoginForm";
import Footer from "../../components/Footer";
import './style.css';

const LoginPage = () =>{
  return (
    <div className='login-page'>
        <img className='logo' alt='logo' src='logo192.png'/>
        <LoginForm className='loginform'/>
        <Footer className='footer'/>
    </div>
  );
}

export default LoginPage