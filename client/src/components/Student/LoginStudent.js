import React, { useRef, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import {useAuth} from '../contexts/AuthContext';
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
import {data, change} from '../../store/data';
import {auth, db} from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  typoRight: {
    color: 'white', 
    fontWeight: 600, 
    textAlign: 'right',
    '&:hover': {
      color: '#608BA6',
    }
  },
  typoLeft: {
    color: 'white', 
    fontWeight: 600, 
    '&:hover': {
      color: '#608BA6',
    }
  }
}));


export default function LoginStudent (props) {
  let history = useHistory();
  const { login } = useAuth()
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const getReady = async () => {
    await auth.onAuthStateChanged((user)=>{
      if(user){
        db.collection('users').doc(user.uid).get().then((snap)=>{
          if(snap.exists) {
            db.collection('meetings').get().then((s)=>{
              data.dispatch(change({
                userData: snap.data(),
                meetingsData: s.docs.map(e=>e.data()),
                meetingsIDs: s.docs.map(e=>e.id)
              }))
            })
          }
        
        })
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      login(emailRef.current, passwordRef.current).then(async ()=>{
      localStorage.clear();
      await getReady();
      history.push('/profile');
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
                  Are you a student? Log in here! 
                </Typography>
                {
                  error !== '' &&
                  <Card style={{marginBottom: 20}}>
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