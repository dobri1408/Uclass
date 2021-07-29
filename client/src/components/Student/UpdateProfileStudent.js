import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grow from "@material-ui/core/Grow";
import Collapse from '@material-ui/core/Collapse';
import { db, auth } from '../firebase/firebase';
import { data, change } from '../../store/data';
import {history, useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    button: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        backgroundColor: '#2a333a',
        width: '100%',
        marginTop: 60,
        marginBottom: 10,
        '&:hover': {
          backgroundColor: '#f2c894',
        }
      },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function UpdateProfileStudent(props) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen]= useState(false);
    const [profileUpdatedOpen, setProfileUpdatedOpen] = useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showLastName, setShowLastName] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const email = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');
    const phone = useRef('');
    const redux = useRef({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        redux.current = data.getState();
        await auth.onAuthStateChanged((user)=>{
            if(user) {
                db.collection("students").doc(user.uid).update({
                    firstName: showFirstName ? firstName.current : data.getState().userData.firstName,
                    lastName: showLastName ? lastName.current : data.getState().userData.lastName,
                    phone: showPhone ? phone.current : data.getState().userData.phone 
                }).then(async ()=>{
                    setOpen(false);
                    await data.dispatch(change({
                        meetingsData: redux.current.meetingsData,
                        meetingsIDs: redux.current.meetingsIDs,
                        userData: {
                            ...redux.current.userData,
                            firstName: showFirstName ? firstName.current : redux.current.userData.firstName,
                            lastName: showLastName ? lastName.current : redux.current.userData.lastName,
                            phone: showPhone ? phone.current : redux.current.userData.phone 
                        }
                    }));
                    setProfileUpdatedOpen(true);
                })
            }
        });
    }

    return(
        <div>
            <Button color="inherit" className={classes.button} onClick={()=>setOpen(true)}>
                <Typography style={{fontWeight: 600}}>
                    UPDATE PROFILE
                </Typography>
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpen(false)}
                style={{backgroundColor: 'transparent', boxShadow: 'none'}}
            >
                <Card style={{width: 500, backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
                    <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                            Update your profile
                        </Typography>


                        <form onSubmit={e=>handleSubmit(e)}>
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your email
                                    <Checkbox
                                        disableRipple
                                        disabled
                                        checked={showEmail}
                                        onChange={()=>setShowEmail(!showEmail)}
                                        name="change-email"
                                        color="primary"
                                        style={{
                                            marginLeft: 180, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showEmail} unmountOnExit>
                            <Grow in={showEmail} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="EMAIL" style={{minWidth: '100%', marginTop: 10}} type='email' onChange={(e)=>email.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                    
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your first name
                                    <Checkbox
                                        disableRipple
                                        checked={showFirstName}
                                        onChange={()=>setShowFirstName(!showFirstName)}
                                        name="change-first-name"
                                        color="primary"
                                        style={{
                                            marginLeft: 127, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showFirstName} unmountOnExit>
                            <Grow in={showFirstName} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="FIRST NAME" style={{minWidth: '100%', marginTop: 10}} type='text' onChange={(e)=>firstName.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your last name
                                    <Checkbox
                                        disableRipple
                                        checked={showLastName}
                                        onChange={()=>setShowLastName(!showLastName)}
                                        name="change-last-name"
                                        color="primary"
                                        style={{
                                            marginLeft: 130, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showLastName} unmountOnExit>
                            <Grow in={showLastName} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="LAST NAME" style={{minWidth: '100%', marginTop: 10}} type='text' onChange={(e)=>lastName.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        

                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your phone number
                                    <Checkbox
                                        disableRipple
                                        checked={showPhone}
                                        onChange={()=>setShowPhone(!showPhone)}
                                        name="change-phone-number"
                                        color="primary"
                                        style={{
                                            marginLeft: 80, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>

                        <Collapse in={showPhone} unmountOnExit>
                            <Grow in={showPhone} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="PHONE" style={{minWidth: '100%', marginTop: 10}} type='number' onChange={(e)=>phone.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        
    
                     
                        
                        <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={e=>handleSubmit(e)} type='submit'>
                            <Typography style={{color: 'white', fontWeight: 600}}>
                                UPDATE!
                            </Typography>
                        </Button>
                        <Dialog
                            open={profileUpdatedOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={()=>{setProfileUpdatedOpen(false);props.setAux(props.aux+1)}}
                            style={{backgroundColor: 'transparent', boxShadow: 'none'}}
                        >
                            <Card style={{width: 500, backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
                                <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                                    <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                                        Profile updated!
                                    </Typography>
                                    <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={()=>{setProfileUpdatedOpen(false);props.setAux(props.aux+1)}} type='submit'>
                                        <Typography style={{color: 'white', fontWeight: 600}}>
                                            GREAT!
                                        </Typography>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Dialog>
                        </form>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    )
}