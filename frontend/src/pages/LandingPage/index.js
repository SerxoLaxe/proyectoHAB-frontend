import React from "react";
import RegisterForm from "../../components/RegisterForm";
import './style.css';
import SearchBar from "../../components/SearchBar";
import SliderLandingPage from "../../components/SliderLandingPage";
import Logo from "../../components/Logo";
const LandingPage = () => {
  return (
    <div className='landing-wrapper'>
      <SliderLandingPage className='landing-slider' />
      <div className='landing-right-side'>
        <img alt='main-logo' className='main-logo' src='logo.svg'/>
        <SearchBar ClassName='landing-searchBar' />
        <RegisterForm className='landing-register-form' />
      </div>
    </div>
  )
};

export default LandingPage;