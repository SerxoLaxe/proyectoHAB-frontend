import {useState} from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  async function register(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('contraseña', password);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/usuarios`,
    {
      method: 'POST',
      body: formData,
    });

  }
  return(
    <form onSubmit={register}>
      <input id='register-email' type='email' onChange={(e)=>{setEmail(e.target.value)}}/>
      <input id='register-password' type='password'onChange={(e)=>{setPassword(e.target.value)}}/>
      <input type='submit'value='Registrarse'/>
    </form>
  );
}

export default RegisterForm