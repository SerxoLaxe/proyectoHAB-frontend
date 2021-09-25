import RollingTumbleweed from "../../animations/RollingTumbleweed";
import './style.css'

const NotFound = () => {
  return (
    <div className='not-found'>
      <div className='error-info-div'>
        <h1>Error 404</h1>
        <h2>Página no encontrada</h2>
      </div>
      <RollingTumbleweed className='rolling-tumbleweed' />
    </div>
  )
}

export default NotFound;