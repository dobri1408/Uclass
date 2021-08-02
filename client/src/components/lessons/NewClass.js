import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { db, auth } from '../firebase/firebase';
import {v4 as uuidV4} from 'uuid';
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {data, change} from '../../store/data';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles((theme) => ({

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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value + 1); // update the state to force render
}

const NewClass = (props) => {
  const forceUpdate = useForceUpdate();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [numbers, setNumbers] = useState([0]);
  const [className, setClassName] = useState(''); //sent to firestore
  const [subject, setSubject] = useState(''); //sent to firestore
  const [students, setStudents] = useState(['']); //sent to firestore
  const [postId, setPostId] = useState('');
  const [code, setCode] = useState('');
  const [doneOpen, setDoneOpen] = useState(false);
  const redux = useRef({});

  useEffect(()=>{
    setPostId(prevPostId => uuidV4());
    setCode(prevCode => uuidV4().substring(0,8));
  },[])


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeOnDelete = () => {
    setNumbers(prevNumbers => numbers.slice(0,-1));
    setStudents(prevStudents => students.slice(0,-1));
  }

  const postData = async (className, students, subject) => {
    await db.collection('meetings').doc(postId).set({
      className, students, subject,
      homework: [],
      titles: [],
      code: code
    })
    await db.collection('codes').doc(code).set({
      meetingId: postId
    })
  }

  const handleDoneClose = () => {
    setDoneOpen(false);
    props.setAux(props.aux+1);
  }


  const handleDataPost = async () => {
    redux.current = data.getState();
    postData(className,students,subject).then(()=>{
        const f = async () => {
          await auth.onAuthStateChanged((user)=>{
            db.collection('users').doc(user.uid).update({
              meetings: firebase.firestore.FieldValue.arrayUnion(postId)
            }).then(()=>{
              data.dispatch(change({
                userData: {
                  ...redux.current.userData,
                  meetings: [...redux.current.userData.meetings, postId]
                },
                meetingsData: [
                  ...redux.current.meetingsData,
                  {
                    className: className,
                    code: code,
                    homework: [],
                    students: students,
                    subject: subject,
                    titles: []
                  }
                ],
                meetingsIDs: [
                  ...redux.current.meetingsIDs, postId
                ]
              }))
              handleClose();
            })
          })
        }
        f().then(()=>{            
          // alert('The new class was added successfully!');
          setDoneOpen(true);
        })
    });

    setPostId(prevPostId => uuidV4());
    setCode(prevCode => uuidV4().substring(0,8))
  }


  

  return (
    <div>
      {/* <IconButton onClick={handleClickOpen} >
        <AddCircleIcon fontSize="large"/>
      </IconButton> */}
      <Button color="inherit" className={classes.button} onClick={handleClickOpen}>
          <Typography className={classes.typo}>
              NEW CLASS
          </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a new class</DialogTitle>
        <IconButton aria-label="close" style={{position: "absolute", right: 3, top: 3}} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText>
            Please complete the fields below in order to add a new class.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Class Name"
            value={className}
            onChange={e => setClassName(prevClassName => e.target.value)}
            type="email"
            fullWidth
          />
          <TextField
            // autofocus
            margin="dense"
            id="name"
            label="Subject"
            value={subject}
            onChange={e => setSubject(prevSubject => e.target.value)}
            type="email"
            fullWidth
          />
          {
            numbers.map((element, index)=>{
              if(element !== numbers.length-1) {
                return(
                  <TextField
                    id={element}
                    margin="dense"
                    label={`Student ${element+1}`}
                    type="email"
                    // value={students[index]}
                    onChange={e => setStudents(prevStudents => [...students.slice(0,index),e.target.value,...students.slice(index+1,students.length)])}
                    fullWidth
                  />
                )
              }
              else {
                return(
                  <TextField
                    id={element}
                    margin="dense"
                    label={`Student ${element+1}`}
                    type="email"
                    onChange={e => setStudents(prevStudents => [...students.slice(0,index),e.target.value,...students.slice(index+1,students.length)])}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={()=>index !==0 ? changeOnDelete() : alert('A class must have at least a student!')}>
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )
              }

            })
          }
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={()=>{setNumbers(prevNumbers=>[...prevNumbers,prevNumbers[prevNumbers.length-1]+1]); setStudents(prevStudents=>[...prevStudents,''])}}>
            Add a new student
          </Button>
          <Button onClick={async ()=>{await handleDataPost()}} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>



      <Dialog
            open={doneOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDoneClose}
            style={{backgroundColor: 'transparent', boxShadow: 'none'}}
        >
          <Card style={{backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
            <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
              <Card style={{backgroundColor: '#d99152'}}>
                <CardContent style={{borderRadius: 50}}>
                
                  <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30}}>
                    The class was added! <span><CheckCircleIcon style={{transform: "scale(1.5)"}}/></span>
                  </Typography>
                    
                </CardContent>
              </Card>
              <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleDoneClose} type='submit'>
                <Typography style={{color: 'white', fontWeight: 600}}>
                  GREAT!
                </Typography>
              </Button>
            </CardContent>
          </Card>
      </Dialog>


    </div>
  );
}


export default NewClass;




// function AlertDialog() {
//   const [open, setOpen] = React.useState(false);

//   const closeDialog = () => {
//     handleClose();
//     window.location.reload();
//   }

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open alert dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Your new class was posted succesfully!"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Please reload this page if you don't see your page right away.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDialog} color="primary" autoFocus>
//             Cool
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }