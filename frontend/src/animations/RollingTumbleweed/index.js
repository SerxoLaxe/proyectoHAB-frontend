import './style.css'
const RollingTumbleweed = () => {
  return (
    <div className='tumbleweed-animation'>
      <img className='tumbleweed' src='/tumbleweed.png' alt='tumbleweed' />
      <svg id='animation-background' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffc642" fillOpacity="1" d="M0,160L60,160C120,160,240,160,360,154.7C480,149,600,139,720,122.7C840,107,960,85,1080,96C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
      </svg>
      
    </div>
  );
}
export default RollingTumbleweed;