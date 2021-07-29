import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import {auth, db} from '../firebase/firebase';
import firebase from 'firebase/app'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
  

export default function RegisterClassStudent() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [meetingId, setMeetingsId] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRegister = async () => {
        await db.collection('codes').doc(code).get().then(s=>{
            if(s.exists) {
                setMeetingsId(s.data().meetingId);
                auth.onAuthStateChanged((user)=>{
                    db.collection('students').doc(user.uid).update({
                        meetings: firebase.firestore.FieldValue.arrayUnion(s.data().meetingId)
                    })
                })
                alert("you are now enrolled!")
            }
            else{
                console.log("wrong code!")
            }
        })
        // await auth.onAuthStateChanged(u=>{
        //     if(u) {
        //         db.collection('users').doc(u.uid).update({
        //             meetings: firebase.firestore.FieldValue.arrayUnion(meetingId)
        //         }).then(e=>alert('you are in the meeting!'))
        //     }
        // })
        handleClose();
    }
    return (
        <div>
            <Button color="inherit" className={classes.button} onClick={handleClickOpen}>
                <Typography style={{fontWeight: 600}}>
                    Register Class
                </Typography>
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Enter your class code (8 CHARS)"}</DialogTitle>
                <DialogContent style={{width: 500}}>
                    <TextField 
                        id="outlined-basic" 
                        label="" 
                        variant="outlined" 
                        placeholder="CLASS CODE" 
                        style={{minWidth: '100%'}} 
                        type='email' 
                        onChange={(e)=>setCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRegister} color="primary">
                        Enroll
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}












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