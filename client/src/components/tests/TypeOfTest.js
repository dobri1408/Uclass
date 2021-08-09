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
import Pdf from '../Terms.pdf'
import Checkbox from '@material-ui/core/Checkbox';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import { db, storage, auth } from '../firebase/firebase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
  
function TypeOfTest() {
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
    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
    
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
                            
                            dates: [],
                            files: [],
                            meetings: [],
                            messages: [],
                            type: 'teacher',
                            firstName: firstName.current,
                            lastName: lastName.current,
                            email: email.current,
                            phone: phone.current,
                            profilePhoto: photoURL.current,
                            
                        }
                        signup(email.current, password.current).then(async (e)=>{
                            await logout();
                            uid.current = e.user.uid;
                            db.collection('users').doc(uid.current).set(data).then((e)=>{
                                db.collection('type').doc(email.current).set({type: 'teacher'}).then((e)=>{
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
           


            <Grid container>
                <Grid item xs={4}> 
                </Grid>
                <Grid item xs={4}> 
                    <Card style={{marginTop: 20}}>
                    <CardContent style={{backgroundColor: '#2A333A'}}>
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                       Create a test
                        </Typography>
                        

                        <form onSubmit={handleSubmit}>
                
                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="NAME OF TEST" style={{minWidth: '100%'}} type='email' onChange={(e)=>firstName.current = e.target.value}/>
                        </CardContent>
                        </Card>

                        

                    
                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                                    Chose the type of the test
                            </Typography>
                        </CardContent>
                        </Card>
                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>
                        <FormControl component="fieldset" style={{backgroundColor:"#608ba6",minWidth: '100%'}}>
   <RadioGroup aria-label="type" name="tyoe" value={value} onChange={handleChange}>
    <FormControlLabel value="female" control={<Radio />} label="Multiple Choice Test" />
    <FormControlLabel value="male" control={<Radio />} label="File Test" />
    <FormControlLabel value="other" control={<Radio />} label="Uclass Style" />
  
  </RadioGroup>
</FormControl>
</CardContent>
                        </Card>
                       


                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                               Please provide how many minutes the test will take
                            </Typography>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>

                        {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="Minutes." style={{minWidth: '100%'}} type='number' onChange={(e)=>phone.current=e.target.value}/>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#D99152'}}>
                            <Typography style={{color: 'white', fontWeight: 500, fontSize: 20, marginLeft: 20, marginTop: 5}}>
                            Chose the date and hour
                            </Typography>
                        </CardContent>
                        </Card>

                        <Card style={{marginBottom: 20}}>
                        <CardContent style={{backgroundColor: '#608BA6'}}>
                        <TextField
                        id="datetime-local"
                        label="Begin at"
                        type="datetime-local"
                        onChange={(e)=>{}}
                        defaultValue="2021-07-01T00:00"
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                        </CardContent>
                        </Card>



                   

                      
                        
                
                        <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleSubmit} type='submit'>
                            <Typography style={{color: 'white', fontWeight: 600}}>
                                REGISTER
                            </Typography>
                        </Button>
                        </form>
                       


                    </CardContent>
                    </Card>
                </Grid>
               

            </Grid>
            
          

        </>
    )
}

export default TypeOfTest
