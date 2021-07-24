import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne,homeIntalnire,homeClasa,homeTest,homeDocument,homeTabla,homeVideo } from './Data';
import Navbar from '../../navbar'
import Footer from '../Footer/Footer';
import './Home.scss'
import AliceCarousel from 'react-alice-carousel';
function Home() {
  return (

    <div className="marireartificiala">
      <Navbar/> 
      <AliceCarousel
              duration={4000}
              autoPlay={true}
              startIndex = {1}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              playButtonEnabled={true}
        
              autoPlayInterval={20000}
              autoPlayDirection="rtl"
              autoPlayActionDisabled={true}
        
      >
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeIntalnire} />
      <HeroSection {...homeClasa} />
      <HeroSection {...homeTest} />
      <HeroSection {...homeDocument} />
      <HeroSection {...homeTabla} />
      <HeroSection {...homeVideo} />
      </AliceCarousel>

      <Footer/>
    </div>
  
    
  );
}

export default Home;