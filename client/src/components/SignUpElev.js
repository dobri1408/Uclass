import React, { useRef, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
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
import Pdf from './Terms.pdf'
import Checkbox from '@material-ui/core/Checkbox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useAuth } from '../components/contexts/AuthContext';
import { db, storage, auth } from './firebase/firebase';

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

export default function SignUpElev() {
    const classes = useStyles();
    const history = useHistory();
    const hiddenFileInput = useRef(null);
    const { signup, logout } = useAuth();
    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const phone = useRef('');
    const password = useRef('');
    const confirmPassword = useRef('');
    const uid = useRef('');
    const photoURL = useRef('');
    const [openPassword, setOpenPassword] = useState(false);
    const [openFields, setOpenFields] = useState(false);
    const [openTick, setOpenTick] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [openFinish, setOpenFinish] = useState(false);
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [final, setFinal] = useState(false)
    
    // const history = useHistory()


    const handleClickPassword = () => {
        setOpenPassword(true);
    };

    const handleClosePassword = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPassword(false);
    };

    const handleClickFields = () => {
        setOpenFields(true);
    };

    const handleCloseFields = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFields(false);
    };

    const handleClickTick = () => {
        setOpenTick(true);
    };

    const handleCloseTick = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTick(false);
    };

    const handleClickPhoto = () => {
        setOpenPhoto(true);
    };

    const handleClosePhoto = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenPhoto(false);
    };

    const handleClickFinish = () => {
        setOpenFinish(true);
    };

    const handleCloseFinish = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFinish(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(firstName.current === '' || 
        lastName.current === '' || 
        email.current === '' || 
        phone.current === '' || 
        password.current === '' ||
        confirmPassword.current === ''
        ) {
            handleClickFields();
        } else {
            if(password.current !== confirmPassword.current) {
                handleClickPassword();
            } else {
                if(!checked1) {
                    handleClickTick();
                } else {
                    try {
                        
                        const data = {
                            
                            meetings: [],
                            type: 'student',
                            firstName: firstName.current,
                            lastName: lastName.current,
                            email: email.current,
                            phone: phone.current,
                            profilePhoto: photoURL.current,
                            
                        }
                        signup(email.current, password.current).then(async (e)=>{
                            await logout();
                            uid.current = e.user.uid;
                            db.collection('students').doc(uid.current).set(data).then((e)=>{
                                db.collection('type').doc(email.current).set({type: 'student'}).then((e)=>{
                                    setFinal(true);
                                    handleClickFinish()
                                })
                            });
                        });
                        




                    } catch {
                    }
                }
            }
        }
    


    }


    const handleUploadClick = async (e) => {
        hiddenFileInput.current.click();
        e.preventDefault();
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const onFileChange = async (e) => {
        if(photoURL.current === '') {
            const file = e.target.files[0];
            const storageRef = storage.ref().child('profile')
            const fileRef = storageRef.child(file.name)
            await fileRef.put(file);
            photoURL.current = await fileRef.getDownloadURL();
            handleClickPhoto();
        }
    }
    
    useEffect(()=>{
        setFinal(false);
    },[])

    return (
        <>
            {/* {   
                uid.current.length !==0 ? (
                    handleClickFinish()
                    // history.push('/profile')
                ) : null
            } */}
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openTick} 
                autoHideDuration={3000} 
                onClose={handleCloseTick}
            >
                <Alert onClose={handleCloseTick} severity="error">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        You must agree to our terms in order to register!
                    </Typography>
                </Alert>
            </Snackbar>
            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openPassword} 
                autoHideDuration={3000} 
                onClose={handleClosePassword}
            >
                <Alert onClose={handleClosePassword} severity="error">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        Passwords do not match!
                    </Typography>
                </Alert>
            </Snackbar>

            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openFields} 
                autoHideDuration={3000} 
                onClose={handleCloseFields}
            >
                <Alert onClose={handleCloseFields} severity="info">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        Please complete all fields!
                    </Typography>
                </Alert>
            </Snackbar>

            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openPhoto} 
                autoHideDuration={3000} 
                onClose={handleClosePhoto}
            >
                <Alert onClose={handleClosePhoto} severity="info">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        Profile photo was uploaded!
                    </Typography>
                </Alert>
            </Snackbar>

            <Snackbar 
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                open={openFinish} 
                autoHideDuration={3000} 
                onClose={handleCloseFinish}
            >
                <Alert onClose={handleCloseFinish} severity="success">
                    <Typography style={{color: 'white', fontSize: '30', fontWeight: 600}}>
                        Profile was created successfully! Please log in!
                    </Typography>
                </Alert>
            </Snackbar>


            {
                !final &&
            <Grid container>
                <Grid item xs={4}> 
                </Grid>
                <Grid item xs={4}> 
                    <Card style={{marginTop: 20}}>
                    <CardContent style={{backgroundColor: '#2A333A'}}>
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                        Register as a student!
                        </Typography>
                        

                        <form onSubmit={handleSubmit}>
                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                                Please provide your name
                            </Typography>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="FIRST NAME" style={{minWidth: '100%'}} type='email' onChange={(e)=>firstName.current = e.target.value}/>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="LAST NAME" style={{minWidth: '100%'}} type='email' onChange={(e)=>lastName.current = e.target.value}/>
                        </CardContent>
                        </Card>

                    
                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                                Please provide your email
                            </Typography>
                        </CardContent>
                        </Card>


                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="EMAIL" style={{minWidth: '100%'}} type='email' onChange={(e)=>email.current=e.target.value}/>
                        </CardContent>
                        </Card>
                        


                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                                Please provide your phone number
                            </Typography>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="PHONE NO." style={{minWidth: '100%'}} type='number' onChange={(e)=>phone.current=e.target.value}/>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                                Please provide your password and confirm it
                            </Typography>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={visible ? 'text' : 'password'}
                                    placeholder='PASSWORD'
                                    onChange={(e)=>password.current=e.target.value}
                                    // value={values.password}
                                    // onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
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



                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>
                            <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={visible2 ? 'text' : 'password'}
                                    placeholder='CONFIRM PASSWORD'
                                    onChange={(e)=>confirmPassword.current=e.target.value}
                                    // value={values.password}
                                    // onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        // onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        onClick={()=>setVisible2(!visible2)}
                                        >
                                        {visible2 ? <VisibilityOff /> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    style={{minWidth: '100%', marginTop: 20}}
                                />
                        </CardContent>
                        </Card>

                        <form>

                            <Button variant="contained" style={{minWidth: '100%', marginBottom: 20, backgroundColor: '#024873'}} onClick={(e)=>handleUploadClick(e)}>
                                <CloudUploadIcon style={{marginRight: 20, color: 'white'}}/>
                                <Typography style={{fontWeight: 500, textAlign: 'center', color: 'white'}}>
                                    Upload a photo!
                                </Typography>
                            </Button>
                            <input type="file"
                                ref={hiddenFileInput}
                                style={{display:'none'}} 
                                onChange={(e)=>onFileChange(e)}
                            />
                        </form>

                        

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Grid container>
                                <Grid item xs={11}>
                                    <Typography style={{fontSize: 15, marginTop: 13, fontWeight: 500, color: 'white'}}>
                                    I agree with the <a href= {Pdf} target="_blank" rel="noopener noreferrer">terms and conditions</a> of the page
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Checkbox
                                        checked={checked1}
                                        onChange={()=>setChecked1(!checked1)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        style={{marginTop: 0, color: '#024873'}}
                                    />
                                </Grid>


                            </Grid>
                        </CardContent>
                        </Card>
                        <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleSubmit} type='submit'>
                            <Typography style={{color: 'white', fontWeight: 600}}>
                                REGISTER
                            </Typography>
                        </Button>
                        </form>
                        <Grid container style={{marginTop: 20}}>
                        <Grid item xs={6}>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Typography className={classes.typoLeft}>
                                Have an account? Login!
                            </Typography>
                            </Link>
                        </Grid>
                        <Grid item xs={6}>
                            <Link to="/signelev" style={{ textDecoration: 'none' }}>
                            <Typography className={classes.typoRight}>
                                Register as a student!
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
            }
            {
                final &&
                <>  
                    <Grid container>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={4}>
                            <Card style={{marginTop: 20}}>
                                <CardContent style={{backgroundColor: '#2A333A'}}>
                                    <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                                        Registered! Please log in!
                                    </Typography>
                                    <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={()=>history.push('/')} >
                                        <Typography style={{color: 'white', fontWeight: 600}}>
                                            GO HOME
                                        </Typography>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}

