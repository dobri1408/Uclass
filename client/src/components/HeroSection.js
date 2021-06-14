import React from 'react';
import './HeroSection.css';

import { Link } from 'react-router-dom';
import Image2 from "./copil.png";
import Image1 from "./img1.png";
import Image3 from './gagica.jpg';
import Image4 from './comunitate.jpg';
import {Button} from 'react-bootstrap';
import Navbar from './navbar';
import Footer from './pages/Footer/Footer'
function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  buttonLabel,
  img,
  alt,
  imgStart
}) {
function  afiseazaimagine (){
    if(img === 1)
return (<img src={Image1} alt={alt} className='home__hero-img' />)
               else if(img == 2){
                return (<img src={Image2} alt={alt} className='home__hero-img' />)

               }
              else if(img == 3) {
                return (<img src={Image3} alt={alt} className='home__hero-img' />)

              }
              else if(img == 4) {
                return (<img src={Image4} alt={alt} className='home__hero-img' />)

              }
  }
  return (
    <>
        <div
        className={lightBg ? 'home_hero-section' : 'home_hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <div className='top-line'>{topLine}</div>
                <h1 className={lightText ? 'heading' : 'heading dark'}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? 'home__hero-subtitle'
                      : 'home__hero-subtitle dark'
                  }
                >
                  {description}
                </p>
                <Link to='/signprofesor'>
                  <Button>
                    {buttonLabel}
                  </Button>
                </Link>
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
               { 
                afiseazaimagine()
              }
                </div>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
}

export default HeroSection;