import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import Image5 from "../LOGO UCLASS ALB full.png";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { useAuth } from '../contexts/AuthContext';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import NewMeeting from '../lessons/NewMeeting';
import NewClass from '../lessons/NewClass';
import RegisterClassStudent from './RegisterClassStudent';
import {data, refresh, persistor} from '../../store/data';

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
    marginLeft: 10,
    '&:hover': {
      backgroundColor: '#2A333A',
    }
  }
}));


function NavbarProf(props) {
  let history = useHistory();
  const classes = useStyles();
  const [error,setError] = useState('');
  const [button, setButton] = useState(true);
  const {logout}  = useAuth();

  async function handleLogout() {

    setError('');
    try {
    logout().then(()=>{
      localStorage.clear();
      persistor.purge();
    });
    history.push('/')
    }
    catch{
        setError('Nu te-am putut deconecta')
    }}


  return (
    <>
        <div className={classes.root}>
          <AppBar position="static" style={{backgroundColor: '#2A333A'}}>
            <Toolbar>
              <IconButton edge="start" disableRipple style={{ backgroundColor: 'transparent' }} className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>history.push('/profile')}>
                <img src={Image5}  alt="" style={{width: 100}}/>
              </IconButton>
    
              <Typography variant="h6" className={classes.title}>
              </Typography>
                
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/student-timetable')}>
                <Typography className={classes.typo}>
                  ORAR
                </Typography>
              </Button>

              <RegisterClassStudent/>

              <Button color="inherit" className={classes.button} onClick={()=>history.push('/student-classes')}>
                <Typography className={classes.typo}>
                  CLASELE MELE
                </Typography>
              </Button>

              <Button color="inherit" className={classes.button} onClick={()=>history.push('/student-profile')}>
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

