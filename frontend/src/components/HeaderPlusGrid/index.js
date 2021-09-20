import Header from '../Header';
import Footer from '../Footer';
import './style.css';

const HeaderPlusGrid = ({ children }) => {

  
  return (
    <div className='header-plus-grid'>
      <Header/> 
      <div className='main'>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default HeaderPlusGrid;