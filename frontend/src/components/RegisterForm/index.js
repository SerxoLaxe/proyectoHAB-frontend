import { useState } from 'react';
import { Link } from "react-router-dom"
import FormError from "../FormError";
import './style.css';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState()

  async function register(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('contraseña', password);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios`,
      {
        method: 'POST',
        body: formData,
      });

    const body = await res.json();
    if (!res.ok) {
      console.log(body.message);
      setError(body.message);
    } else {
      setError('')
    }
  }

  return (
    <div className='register-div'>
      <h2>Únete ahora</h2>

      <form className='register-form' onSubmit={register}>
        <input
          id='register-email'
          type='email'
          placeholder='Email...'
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          id='register-password'
          type='password' placeholder='Contraseña...'
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <p>Al registrarte aceptas nuestros <Link to='/termsandconditions'>Términos y condiciones</Link></p>
        <input type='submit' value='Registrate' />
      </form>
      <p>¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión</Link></p>
      {error && <FormError error={error} />}
    </div>
  );
}

export default RegisterForm