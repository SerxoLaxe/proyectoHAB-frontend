import React from "react";
import LoginForm from "../../components/LoginForm";
import './style.css';
import Carousel from "../../components/Carousel";
import Titles from "../../components/Titles";
import Footer from "../../components/Footer";
import SearchBar from "../../components/SearchBar";
const LandingPage = () => {
  return (
    <div className='container_landing_page'>
      
       <div className='container_carousel_img'>
            <Carousel className=''/>
       </div>  

       <div className='container_searchBar'>
            <SearchBar ClassName='searchBar'/>
       </div>  

       <div className='container_titles'>
            <Titles className='titles'/>
       </div>

      <div className='container_login_form'>
            <LoginForm className='loginforma'/> 
      </div>

       <div className="container_footer_landing">

       <Footer className="footer_landing"/> 

     </div>

    </div>
    
  )
};

export default LandingPage;