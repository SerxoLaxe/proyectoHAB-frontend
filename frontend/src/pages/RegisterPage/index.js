import Footer from "../../components/Footer";
import Logo from "../../components/Logo";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className='register-page-wrapper'>
      <Logo />
      <RegisterForm/>
      <Footer />
    </div>
  );
}

export default RegisterPage;