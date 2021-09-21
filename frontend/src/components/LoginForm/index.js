import { useState } from "react"
import { Link } from "react-router-dom"
import { Redirect } from "react-router";
import { useUserTokenContext } from "../../contexts/UserTokenContext";
import FormError from "../FormError";
import './style.css'


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useUserTokenContext();

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/usuarios/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          contraseña: password
        }),
      }
    );

    if (res.ok) {
      setError("");
      const body = await res.json();
      setToken(body.data.token);
    } else {
      const errorNow = await res.json();
      setError(errorNow.message);
    }
  };


  if (token) {
    return <Redirect to="/app" />;
  }

  return (
    <div className='login-div'>
      <h2>Inicia sesión</h2>

      <form className='login-form' onSubmit={login}>
      <input
      id='email'
      type ='email'
      name='email'
      value={email}
      placeholder='Email...'
      onChange={(e) => {
      setEmail(e.target.value);
    }} />

      <input
      id='password'
      type ='password'
      name='password'
      value={password}
      placeholder='Contraseña...'
      onChange={(e) => {
      setPassword(e.target.value);
    }} />

      <input
      type ='submit'
      value='Iniciar sesion' />
      </form>
      <div className='text-box'>
      <p>¿No tienes una cuenta? <Link to='/register'>Regístrate</Link></p>
      <Link to='/lostpassword'>¿Has olvidado tu contraseña?</Link>
      </div>
    {error && <FormError error={error} />}
    </div>
  )
}

export default LoginForm