import React, { useState, useEffect, useContext } from 'react';
import './navbar.css';
import {useHistory} from 'react-router-dom';
import Image5 from "./LOGO UCLASS ALB full.png";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from './contexts/AuthContext';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import NewMeeting from './lessons/NewMeeting';
import NewClass from './lessons/NewClass';
import { DataContext } from '../App';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 400,
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
    }
  },
  typo: {
    fontWeight: 600,
    
  },
  icon: {
    backgroundColor: '#345F65',
    '&:hover': {
      backgroundColor: '#2A333A',
    }
  }
}));


function NavbarProf(props) {
  const data = useContext(DataContext);
  let history = useHistory();
  const classes = useStyles();
  // const [click, setClick] = useState(false);
  const [error,setError] = useState('');
  const [button, setButton] = useState(true);
  const {logout}  = useAuth();
  // const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  async function handleLogout() {

    setError('');
    try {
    logout().then(()=>{
      localStorage.removeItem('userData');
      localStorage.removeItem('meetingsData');
    });
    history.push('/login')
    }
    catch{
        setError('Nu te-am putut deconecta')
    }
        }
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

// async function handleLogout() {

//   try {
//     await logout();
//     history.push('/')
//   } catch (err) {
//     console.log(err)
//   }

// }
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
                  to='/profile'
                  className='nav-links'
                  onClick={closeMobileMenu}
                >
                  Profil
                </Link>
              </li>
              <li className='nav-btn'>
              <Button onClick={handleLogout}>Deconecteaza-te</Button>
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
              {/* <Button onClick={()=>console.log(props.feed === undefined)}>
                click
              </Button> */}
              
              {
                props.feed !== undefined &&
                <>
                  {/* <Button color="inherit" className={classes.button} onClick={()=>console.log('new meeting added!')}>
                    <Typography className={classes.typo}>
                      new meeting
                    </Typography>
                  </Button> */}
                  <NewMeeting info={{className: props.feed.title}} />
                  <Card style={{backgroundColor: '#024873', flexGrow: 1, marginRight: 20, marginLeft: 20, boxShadow: 'none', borderRadius: 50}}>
                    <CardHeader
                      title={
                        <>
                          <Typography style={{color: 'white', fontSize: 40, fontWeight: 500}}>
                            {props.feed.title}
                          </Typography>
                        </>
                      }
                    />
                    {/* <CardContent>
                      <Typography variant="h6" className={classes.title}>
                        {props.feed.title}
                      </Typography>
                    </CardContent> */}
                    
                  </Card>
                </>
              }

              {
                props.classes !== undefined &&
                <>
                  {/* <Button color="inherit" className={classes.button} onClick={()=>console.log('new meeting added!')}>
                    <Typography className={classes.typo}>
                      new meeting
                    </Typography>
                  </Button> */}
                  <NewClass />
                  <Card style={{backgroundColor: '#024873', flexGrow: 1, marginRight: 20, marginLeft: 20, boxShadow: 'none', borderRadius: 50}}>
                    <CardHeader
                      title={
                        <>
                          <Typography style={{color: 'white', fontSize: 40, fontWeight: 500}}>
                            {props.classes.title}
                          </Typography>
                        </>
                      }
                    />
                    
                  </Card>
                </>
              }
              {
                props.classes === undefined && props.feed === undefined &&
                <Typography variant="h6" className={classes.title}>
                </Typography>
              }
                
              
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
              
              <IconButton className={classes.icon} onClick={handleLogout}>
                <PowerSettingsNewIcon style={{color: '#E57373'}}/>
              </IconButton>

            </Toolbar>
          </AppBar>
        </div>
    </>
  );
}

export default NavbarProf;

