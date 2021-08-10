import React, {useState, useRef} from 'react';
import { Link, useHistory } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import {auth, db} from '../firebase/firebase';
import {data, change, persistor} from '../../store/data';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
      postion: 'fixed',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 0,
      backgroundColor: 'black',
      marginRight: '1%',
      marginLeft: '1%',
      marginTop: 25,
      border: '7px solid #d99152',
      width: '18%',
      // '&:hover': {
      //   backgroundColor: '#d99152',
      //   border: '7px solid white',
      //   width: '100%',
      //   marginRight: 0,
      //   marginLeft: 0,
      //   position: 'fixed',
      //   left: 0,
      //   top: 0,
      //   zIndex: '200',
      //   // width: 100,
      //   // zIndex: 100
      // }
    },
    typo: {
      fontWeight: 600,
      fontSize: 25,
      color: 'white',
      // '&:hover': {
      //   color: 'black'
      // }
    },
    typoLeft: {
      fontWeight: 600,
      color: '#d99152'
    },
    typoRight: {
      fontWeight: 600,
      color: '#d99152'
    },
    icon: {
      backgroundColor: '#345F65',
      '&:hover': {
        backgroundColor: '#2A333A',
      }
    }
  }));


export default function Login2() {
    const [open, setOpen] = useState(false);
    const [noUser, setNoUser] = useState(false);
    const [wrongPass, setWrongPass] = useState(false); 
    const classes = useStyles();
    const { login, logout }  = useAuth();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const handleClickNoUser = () => {
        setNoUser(true);
    };

    const handleCloseNoUser = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNoUser(false);
    };

    const handleClickWrongPass = () => {
        setWrongPass(true);
    };

    const handleCloseWrongPass = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWrongPass(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    let history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [visible, setVisible] = useState(false);

    const getReadyStudent = async () => {
      await auth.onAuthStateChanged((user)=>{
        if(user){
          db.collection("students").doc(user.uid).get().then((snap)=>{
            if(snap.exists){
              db.collection("meetings").get().then((s)=>{
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
       
        db.collection('type').doc(emailRef.current).get().then(s=>{
          if(s.exists){
            if(s.data().type==='student') {
              login(emailRef.current, passwordRef.current).then(async ()=>{
                localStorage.clear();
               history.push('/student-profile');
                }).catch(e=>{
                    if(e.code === 'auth/user-not-found') handleClickNoUser();
                    else handleClickWrongPass()
              })
            }
            else{
              logout().then(()=>{
                alert('Hmm...You seem to be a teacher!')
              })
            }

          } else {
            handleClickNoUser();
          }
        })
      } catch (e) {
          console.log('An error has occured!')
      }

    }






    return (
        <>
        <Button color="inherit" className={classes.button} onClick={handleClickOpen}>
            <Typography className={classes.typo}>
                LOGIN AS STUDENT
            </Typography>
        </Button>

        <Snackbar 
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={noUser} 
            autoHideDuration={3000} 
            onClose={handleCloseNoUser}
        >
            <Alert onClose={handleCloseNoUser} severity="info">
                <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                    This email address is not registered!
                </Typography>
            </Alert>
        </Snackbar>

        <Snackbar 
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            open={wrongPass} 
            autoHideDuration={3000} 
            onClose={handleCloseWrongPass}
        >
            <Alert onClose={handleCloseWrongPass} severity="error">
                <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                    Username or password is invalid!
                </Typography>
            </Alert>
        </Snackbar>


        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            style={{backgroundColor: 'transparent', boxShadow: 'none'}}
        >
            <Card style={{width: 500, backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
              <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                🧑‍🎓 STUDENT LOGIN
                </Typography>
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
                    <Link to="/forgot-password" style={{ textDecoration: 'none', textAlign: 'left' }}>
                      <Typography className={classes.typoLeft}>
                        Forgot password?
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/signelev" style={{ textDecoration: 'none', textAlign: 'right' }}>
                      <Typography className={classes.typoRight}>
                        Create an account!
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
        </Dialog>
        </>
    );
}