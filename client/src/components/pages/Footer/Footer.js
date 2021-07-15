import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import Pdf from '../../Azur.pdf'
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { MdFingerprint } from 'react-icons/md';
import Image5 from "../../LOGO UCLASS ALB full.png";

function Footer() {
  return (
    <div className='footer-container'>
     
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Despre Noi</h2>
            <a href = {Pdf} target = "_blank" rel="noreferrer">Termeni si conditii</a>
         
           
          </div>
          <div className='footer-link-items'>
            <h2 >Contact</h2>
         
            <Link to='/'>Suport</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
        
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
            
            <img src={Image5} className='logofooter' alt="" style ={{height:70}}/>
            </Link>
          </div>
          <small className='website-rights'>Uclass © 2021</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <FaFacebook />
            </Link>
            <Link
              className='social-icon-link'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <FaInstagram />
            </Link>
            <Link
              className='social-icon-link'
              to={
                '//www.youtube.com/channel/UCsKsymTY_4BYR-wytLjex7A?view_as=subscriber'
              }
              target='_blank'
              aria-label='Youtube'
            >
              <FaYoutube />
            </Link>
           
       
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;