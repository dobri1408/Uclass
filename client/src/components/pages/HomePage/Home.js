import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne } from './Data';
import Navbar from '../../navbar'
import Footer from '../Footer/Footer';
import './Home.scss'

function Home() {
  return (
    <>
<div className="bagpl">
    <Navbar/>

      <HeroSection {...homeObjOne} />
    <Footer/>
    </div>
    </>
  );
}

export default Home;