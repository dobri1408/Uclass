import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import  { useRef} from "react"
import {useHistory } from "react-router-dom"
import {useAuth} from './contexts/AuthContext';
import Modal from 'react-modal';
import '../components/Login.scss';
import Image5 from "./LOGO UCLASS ALB full.png";

const customStyles = {
  content : {

    top                   : '20%',
    left                  : '20%',
    right                 : '40%',
    bottom                : 'auto',
  
    transform             : 'translate(35%, 20%)'
    
  }
};


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [toggle,settoggle] = useState(0);
  const [open, setopen] = useState(0)
  const { login } = useAuth()
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
      
  }

  function closeModal(){
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/profile")
    } catch {
      setError("Nu am putut sa te conectam, mai incearca o data")
    }

    setLoading(false)
  }

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
},[]);
window.addEventListener('resize',showButton);
  return (
    <>
        <nav className='navbar'>
          <div className='navbar-container container'>
              <ul className='nav-item'>
             <img src={Image5} className='pula' />
              </ul>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              
              <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                  Acasa
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/services'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Tarife
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  to='/products'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Despre
                </Link>
              </li>
              <li className='nav-btn'>

              <div>
        <Button onClick={openModal}>Login</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

<div className="loglog">
      <div class="card">
        <div class="card--header">
          <p class="title">Hello, World!</p>
        </div>
        <div class="card--body">
          <label>Email Adress</label>
          <input type="text" ref={emailRef} required />
          <label>Password</label>
          <input type="password" ref={passwordRef} required />
        </div>
      <div class="card--footer">
        <button type="submit" id="signup" class="btn_sign-up" onClick={handleSubmit}>login</button>
      </div>
    </div>
    </div>
        </Modal>
      </div>  
              </li>
            </ul>
          </div>
        </nav>
    </>
  );
}

export default Navbar;

/*
transform             : 'translate(-50%, -50%)'
  marginRight           : '-20%',
*/