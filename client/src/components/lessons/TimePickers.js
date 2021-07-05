import 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {Button} from '@material-ui/core';
import { db, auth } from '../firebase/firebase';
import firebase from "firebase/app";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const ITEM_HEIGHT = 48;




export default function TimePickers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [startDate, setStartDate] = useState(new Date('2021-06-20T12:00:00'));
  const [endDate, setendDate] = useState(new Date('2021-06-20T12:00:00'));
  const [uid, setUid] = useState('');
  // const [currentClass, setCurrrentClass] = useState(null);
  const currentClass = useRef(null);
  // const [currentClassHash, setCurrentClassHash] = useState(null);
  const currentClassHash = useRef(null);
  // const [firebaseData, setFirebaseData] = useState([]);
  const firebaseData = useRef([]);
  // const [classes, setClasses] = useState([]);
  const classes = useRef([]);

  const getData = () => {
    auth.onAuthStateChanged((user)=>{
        if(user) {
          db.collection('users').doc(user.uid).get().then((snap)=>{
              if(snap.exists) {
                // setFirebaseData(prevFirebaseData => snap.data().meetings);
                firebaseData.current = snap.data().meetings;
                if ( snap.data().dates !== undefined ) {
                  // numberOfMeetings.current =  'dates'.cocat(`.${numberOfMeetings}`)
                }
                firebaseData.current.forEach((element)=>{
                  db.collection("meetings").doc(element).get().then((doc)=>{
                    if(doc.exists) {
                      if(classes.current.includes(doc.data().className) === false) {
                        // setClasses(prevClasses => [...prevClasses, doc.data().className])
                        classes.current = [...classes.current, doc.data().className];
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
  };

  const getCurrentHash = () => {
    firebaseData.current.forEach((element)=>{
      db.collection("meetings").doc(element).get().then((doc)=>{
        if(doc.exists) {
          if(doc.data().className === currentClass.current) {
            currentClassHash.current = doc.id;
          }  
        } else {
          console.log('no hash found!')
        }
      })
    })
  }


  useEffect(()=>{
    const getUid = async () => {      
      await auth.onAuthStateChanged((user)=>{
        if(user) {
          setUid(prevUid => user.uid)
        }
      });
    }
    getUid();
    getData();
  },[]);



  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStartDate = (date) => {
    setStartDate(date);
  };

  const handleEndDate = (date) => {
    setendDate(date);
  };


  const handleSend = () => {
    if(currentClass.current === null || currentClassHash.current === null) {
      alert('please select a class!')
    } else {
          db.collection('users').doc(uid).update({
            dates: firebase.firestore.FieldValue.arrayUnion({
              start: startDate.getTime() / 1000,
              end: endDate.getTime() / 1000,
              classHash: currentClassHash.current,
              className: currentClass.current
            })
          })
      currentClass.current = null;
      currentClassHash.current = null;
      alert('New meeting was added!')
    }
  }

  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Start of meeting"
              value={startDate}
              onChange={handleStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog2"
              label="End Date"
              format="MM/dd/yyyy"
              value={endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker2"
              label="End of meeting"
              value={endDate}
              onChange={handleEndDate}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />


            <div>  
              <Button variant="contained" color="secondary" onClick={(e)=>handleClick(e)}>
                choose class
              </Button>

              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {
                  classes.current.map((option) => (
                    <MenuItem key={option} selected={currentClass.current === null ? false : option === currentClass.current} onClick={()=>{handleClose(); currentClass.current=option; getCurrentHash()}}>
                      {option}
                    </MenuItem>
                  ))
                }
              </Menu>
            </div>

          <br/><br/><br/>
  
          <Button variant="contained" color="secondary" onClick={()=>handleSend()}>
            Set meeting!
          </Button>

      </Grid>
    </MuiPickersUtilsProvider>
  );
}