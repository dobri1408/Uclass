import React, {useState,forwardRef, useEffect, useRef} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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

export default function NewMeeting (props) {
    const classes2 = useStyles();
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date('2021-06-20T12:00:00'));
    const [endDate, setEndDate] = useState(new Date('2021-06-20T12:00:00'));
    const [readyOpen, setReadyOpen] = useState(false);
    const currentClassHash = useRef('')
    const firebaseData = useRef([]);
    const redux = useRef({});
    const changedMeetingsData = useRef([]);
    useEffect(()=>{
        const getHash = () => {
            // auth.onAuthStateChanged((user)=>{
            //     if(user) {
            //       db.collection('users').doc(user.uid).get().then((snap)=>{
            //           if(snap.exists) {
            //             firebaseData.current = snap.data().meetings;
            //             firebaseData.current.forEach((element)=>{
            //               db.collection("meetings").doc(element).get().then((doc)=>{
            //                 if(doc.exists) {
            //                     if(doc.data().className === info.className) {
            //                         currentClassHash.current = element;
            //                     }
            //                 } else {
            //                   console.log("error! the class you were looking for was not found!")
            //                 }
            //               })
            //             })
            //           } 
            //         });
            //       }
            //     })
            firebaseData.current = data.getState().userData.meetings;
            data.getState().meetingsData.forEach((e,i)=>{
              if(e.className === props.info.className) {
                currentClassHash.current = data.getState().meetingsIDs[i];
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

        if(title !== '') {
            redux.current = data.getState();
            await db.collection('meetings').doc(currentClassHash.current).update({
              titles: firebase.firestore.FieldValue.arrayUnion({
                  title: title,
                  start: startDate.getTime() / 1000,
                  end: endDate.getTime() / 1000,
                  timestamp: Date.now() / 1000 | 0
              })
            })
            redux.current.meetingsData.forEach((e,i)=>{
              if(redux.current.meetingsIDs[i] !== currentClassHash.current) changedMeetingsData.current.push(redux.current.meetingsData[i])
              else {
                changedMeetingsData.current.push({
                  titles: [...redux.current.meetingsData[i].titles, {
                    title: title,
                    start: startDate.getTime() / 1000,
                    end: endDate.getTime() / 1000,
                    timestamp: Date.now() / 1000 | 0
                  }],
                  ...redux.current.meetingsData[i]
                })
              }
            })
            data.dispatch(change({
              userData: redux.current.userData,
              meetingIDs: redux.current.meetingsIDs,
              meetingsData: changedMeetingsData.current
            }))
            await getReady();
            setReadyOpen(true);
        } else {
            alert('please make sure to add a title to your meeting!');
        }
        

        handleClose();
    }

    const handleReadyClose = () => {
      setReadyOpen(false);
      props.setAux2(props.aux2+1);
      // something to cause a rerender!
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
                <DialogTitle id="alert-dialog-slide-title">{`Schedule a new meeting for class ${props.info.className}`}</DialogTitle>
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



            <Dialog
            open={readyOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleReadyClose}
            style={{backgroundColor: 'transparent', boxShadow: 'none'}}
            >
                <Card style={{backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
                  <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                    <Card style={{backgroundColor: '#d99152'}}>
                      <CardContent style={{borderRadius: 50}}>
                      
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30}}>
                          The meeting was added! <span><CheckCircleIcon style={{transform: "scale(1.5)"}}/></span>
                        </Typography>
                          
                      </CardContent>
                    </Card>
                    <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleReadyClose} type='submit'>
                      <Typography style={{color: 'white', fontWeight: 600}}>
                        GREAT!
                      </Typography>
                    </Button>
                  </CardContent>
                </Card>
            </Dialog>


        </>
    )
}