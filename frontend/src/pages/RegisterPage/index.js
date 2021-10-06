import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import RegisterForm from "../../components/RegisterForm";
import './style.css';

const RegisterPage = () => {
  return (
    <div className='register_page'>
      <Logo className='logo'/>
      <RegisterForm name='register_form'/>
      <Footer name='footer'/>
    </div>
  );
}

export default RegisterPage;