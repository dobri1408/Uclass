// import React, {useEffect, useState, useRef} from 'react';
import React from 'react';
// import {db} from './firebase/firebase';
import NavbarProf from './NavbarProf';
// import {auth} from './firebase/firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Logo from './Logoo.jpg';
import {useAuth } from './contexts/AuthContext'
import './profile.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height:'100%',
    color: theme.palette.text.secondary,
    boxShadow: "none"
  },
  profile:{
    height:"80vh",
    flexGrow: 1,
  }
}));




export default function Profile(props) {
  const classes = useStyles();
  return (
    <>
      <NavbarProf/>
      <Button onClick={()=>console.log(props.data.userData)}>
        userData
      </Button>
      <Button onClick={()=>console.log(props.data.meetingsData)}>
        meetingsData
      </Button>
      {
        props.data.userData !== [] ?
        <div className={classes.profile} style ={{alignItems:'center',display: 'flex', justifyContent: 'center'}}>
      <Grid container spacing={3}>
       
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {props.data.userData.profilePhoto ?          <img style = {{height:"670px",width:"910px"}} src={props.data.userData.profilePhoto} alt= 'ai poza de profil'/> :<img style = {{height:"670px",width:"910px"}}src={Logo} alt= 'nu ai poza de profil'/> }
               </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} style={{paddingTop:"16%",backgroundColor: '#F2F2F2'}}>
            <div style ={{backgroundColor:'#345F65'}}>
            <h1 style ={{color:'white', margin:15}}> Prenume: {props.data.userData.firstName}</h1>
            <h1 style ={{color:'white', margin:15}}> Nume de familie: {props.data.userData.lastName}</h1>
            
            <h1 style ={{color:'white', margin:15}}> Email: {props.data.userData.email}</h1>
            <h1 style ={{color:'white', margin:15}}> Telefon: {props.data.userData.phone}</h1>
            <h1 style ={{color:'white', margin:15}}>Cont: Profesor</h1>
            
            </div>
          </Paper>
      
        </Grid>
             </Grid>
    </div>:
        <>
          <Grid container spacing={0}>
            <Grid item xs={6}>
            </Grid>

              <CircularProgress style={{
                width: 500, 
                height: 500, 
                marginTop: 100, 
                color: '#D99152', 
                marginLeft: -250
              }}/>
            <Grid item xs={6}>
            </Grid>
          </Grid>
            
        </>
      }

    </>
  )

}
