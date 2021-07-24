import React, {useState,forwardRef, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { auth, db } from '../firebase/firebase';
import firebase from "firebase/app";
import { Typography } from '@material-ui/core';
import { data, change } from '../../store/data';

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

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
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
          // marginBottom: 10,
        }
      },
      typo: {
        fontWeight: 600,
        
      },
  }));

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewMeeting ({info}) {
    const classes2 = useStyles();
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date('2021-06-20T12:00:00'));
    const [endDate, setEndDate] = useState(new Date('2021-06-20T12:00:00'));
    const currentClassHash = useRef('')
    const firebaseData = useRef([]);

    useEffect(()=>{
        const getHash = () => {
            auth.onAuthStateChanged((user)=>{
                if(user) {
                  db.collection('users').doc(user.uid).get().then((snap)=>{
                      if(snap.exists) {
                        firebaseData.current = snap.data().meetings;
                        firebaseData.current.forEach((element)=>{
                          db.collection("meetings").doc(element).get().then((doc)=>{
                            if(doc.exists) {
                                if(doc.data().className === info.className) {
                                    currentClassHash.current = element;
                                }
                            } else {
                              console.log("error! the class you were looking for was not found!")
                            }
                          })
                        })
                      } 
                    });
                  }
                })
        }
        getHash();
    },[])


    const handleClickOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    const handleStartDate = (date) => {
        setStartDate(new Date(date));
    };
    
    const handleEndDate = (date) => {
    setEndDate(new Date(date))
    };
      
    const handleSchedule = async () => {
        // console.log({
        //     title: title,
        //     start: startDate.getTime() / 1000,
        //     end: endDate.getTime() / 1000,
        //     hash: currentClassHash.current
        // })

        if(title !== '') {
            await db.collection('meetings').doc(currentClassHash.current).update({
                titles: firebase.firestore.FieldValue.arrayUnion({
                    title: title,
                    start: startDate.getTime() / 1000,
                    end: endDate.getTime() / 1000,
                    timestamp: Date.now() / 1000 | 0
                })
              })
            await getReady();
            alert('succes!')
        } else {
            alert('please make sure to add a title to your meeting!')
        }
        

        handleClose();
    }

    return (
        <>
            {/* <IconButton onClick={handleClickOpen}>
                <ScheduleIcon/>
            </IconButton> */}
            <Button color="inherit" className={classes2.button} onClick={handleClickOpen}>
                <Typography className={classes2.typo}>
                    new meeting
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
                <DialogTitle id="alert-dialog-slide-title">{`Schedule a new meeting for class ${info.className}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Add a new title for your meeting. Make sure be as specific as possible as to avoid any confusion.
                    </DialogContentText>
                    <TextField id="outlined-basic" label="" variant="outlined" placeholder="your new title" onChange={e=>setTitle(e.target.value)}/><br/><br/>
                    <DialogContentText id="alert-dialog-slide-description">
                        When do you want this meeting to take place?
                    </DialogContentText>
                    <form className={classes2.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Begin at"
                        type="datetime-local"
                        onChange={(e)=>handleStartDate(e.target.value)}
                        defaultValue="2021-07-01T00:00"
                        className={classes2.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form><br/><br/>
                    <form className={classes2.container} noValidate>
                    <TextField
                        id="datetime-local"
                        label="Finish at"
                        type="datetime-local"
                        onChange={(e)=>handleEndDate(e.target.value)}
                        defaultValue="2021-07-01T00:00"
                        className={classes2.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleSchedule} variant="contained" color="primary">
                    Schedule new meeting!
                </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}