import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {useAuth} from './contexts/AuthContext';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { OutlinedInput } from "@material-ui/core";
import ErrorIcon from '@material-ui/icons/Error';
import { db, auth } from './firebase/firebase';



const useStyles = makeStyles((theme) => ({
  typoRight: {
    color: 'white', 
    fontWeight: 600, 
    textAlign: 'right',
    '&:hover': {
      color: '#608BA6',
      // marginBottom: 10,
    }
  },
  typoLeft: {
    color: 'white', 
    fontWeight: 600, 
    '&:hover': {
      color: '#608BA6',
      // marginBottom: 10,
    }
  }
}));

export default function Login(props) {
  const { login } = useAuth()
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  // const userData = useRef([]);
  // const classesData = useRef([]);
  const [error, setError] = useState("")
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const mData = useRef([]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setError("")
      login(emailRef.current, passwordRef.current).then(async ()=>{
        await auth.onAuthStateChanged((user)=>{
          db.collection('users').doc(user.uid).get().then((snap)=>{
            if(snap.exists) {
              props.data.setUserData(snap.data());
              snap.data().meetings.forEach((element, index)=>{
                db.collection('meetings').doc(element).get().then((s)=>{
                  if(mData.current.length < snap.data().meetings.length) mData.current.push(s.data())
                })
              })
              props.data.setMeetingsData(mData.current)
            }
          })

        })

        history.push('/profile')

      })
    } catch {
      setError("Nu am putut sa te conectam, mai incearca o data")
    }

  }

  return (
    <>
      <Grid container>
        <Grid item xs={4}> 
        </Grid>
        <Grid item xs={4}> 
            <Card style={{marginTop: 20}}>
              <CardContent style={{backgroundColor: '#2A333A'}}>
                <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                  Login page
                </Typography>
                {
                  error &&
                  <Card style={{marginBottom: 20}}>
                    {/* <CardHeader>

                    </CardHeader> */}
                    <CardContent style={{backgroundColor: '#E57373'}}>
                      <Grid container>
                        <Grid item xs={2}>
                          <ErrorIcon style={{color: 'white', transform: 'scale(2)', marginTop: 20, marginLeft: 20, marginBottom: 20}}/>
                        </Grid>  
                        <Grid item xs={10}>
                          <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 20, marginTop: 5}}>
                            {error}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                }
                <form onSubmit={handleSubmit}>
                <Card style={{marginBottom: 20}}>
                  <CardContent style={{backgroundColor: '#608BA6'}}>

                  {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                  <TextField id="outlined-basic" label="" variant="outlined" placeholder="EMAIL" style={{minWidth: '100%'}} type='email' onChange={(e)=>emailRef.current=e.target.value}/>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent style={{backgroundColor: '#608BA6'}}>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={visible ? 'text' : 'password'}
                    placeholder='PASSWORD'
                    onChange={(e)=>passwordRef.current=e.target.value}
                    // value={values.password}
                    // onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          edge="end"
                          onClick={()=>setVisible(!visible)}
                        >
                          {visible ? <VisibilityOff /> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    }
                    style={{minWidth: '100%', marginTop: 20}}
                  />
                  </CardContent>
                </Card>
                <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleSubmit} type='submit'>
                  <Typography style={{color: 'white', fontWeight: 600}}>
                    LOGIN
                  </Typography>
                </Button>
                </form>
                <Grid container style={{marginTop: 20}}>
                  <Grid item xs={6}>
                    <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
                      <Typography className={classes.typoLeft}>
                        Forgot password?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/signprofesor" style={{ textDecoration: 'none' }}>
                      <Typography className={classes.typoRight}>
                        Create an account!
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}> 
        </Grid>
      </Grid>
    </>
  )
}