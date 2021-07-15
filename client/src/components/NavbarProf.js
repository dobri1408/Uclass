import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { MdFingerprint } from 'react-icons/md';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import Image5 from "./LOGO UCLASS ALB full.png";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    backgroundColor: '#345F65',
    marginRight: 10,
    marginLeft: 10,
    '&:hover': {
      backgroundColor: '#2A333A',
      // marginBottom: 10,
    }
  },
  typo: {
    fontWeight: 600,
    
  }
}));


function NavbarProf() {
  let history = useHistory();
  const classes = useStyles();
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
     
        {/* <nav className='navbar'>
          <div className='navbar-container container'>
          <ul className='nav-item'>
             <img src={Image5} className='pula' alt=""/>
              </ul>
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
        <br/> */}

        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor: '#024873'}}>
            <Toolbar>
              <IconButton edge="start" disableRipple style={{ backgroundColor: 'transparent' }} className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>history.push('/profile')}>
                <img src={Image5}  alt="" style={{width: 100}}/>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
              </Typography>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/teachertimetable')}>
                <Typography style={{fontWeight: 600}}>
                  Orar
                </Typography>
              </Button>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/classes')}>
                <Typography style={{fontWeight: 600}}>
                  Clasele Mele
                </Typography>
              </Button>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/startmeeting')}>
                <Typography style={{fontWeight: 600}}>
                  Intalnire
                </Typography>
              </Button>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/products')}>
                <Typography style={{fontWeight: 600}}>
                  Lectii
                </Typography>
              </Button>

              <Button color="inherit" className={classes.button} onClick={()=>history.push('/profile')}>
                <Typography className={classes.typo}>
                  Profil
                </Typography>
              </Button>

            </Toolbar>
          </AppBar>
        </div>
    </>
  );
}

export default NavbarProf;

