import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

function NavbarProf() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect((button) => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
},[]);
window.addEventListener('resize',showButton);
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
              <MdFingerprint className='navbar-icon' />
              Azur
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <Link to='/teachertimetable' className='nav-links' onClick={closeMobileMenu}>
                  Orar
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/classes'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                Clasele Mele
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/startmeeting'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Intalnire
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                   Lectii
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/profile'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Profil
                </Link>
              </li>
             </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarProf;

