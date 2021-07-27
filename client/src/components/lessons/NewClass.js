import React, { useState, useEffect } from 'react';
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
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import { db, auth } from '../firebase/firebase';
import {v4 as uuidV4} from 'uuid';
import firebase from "firebase/app";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {data, change} from '../../store/data';

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

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

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

const NewClass = (props) => {
  const classes = useStyles();
  const forceUpdate = useForceUpdate();
  const [open, setOpen] = useState(false);
  const [numbers, setNumbers] = useState([0]);
  const [className, setClassName] = useState(''); //sent to firestore
  const [subject, setSubject] = useState(''); //sent to firestore
  const [students, setStudents] = useState(['']); //sent to firestore
  const [uid, setUid] = useState('');
  const [postId, setPostId] = useState('');
  const [code, setCode] = useState('');


  useEffect(()=>{
    const getUid = async () => {      
      await auth.onAuthStateChanged((user)=>{
        if(user) {
          setUid(prevUid => user.uid)
        }
      });
    }
    getUid();
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
    // await db.collection('meetings').add({
    //   className, students, subject
    // })
    await db.collection('meetings').doc(postId).set({
      className, students, subject,
      homework: [],
      titles: [],
      code: code
    })
    await db.collection('codes').doc(code).set({
      meetingId: postId
    })
    // await db.collection('users').where('uid','==',uid).where(db.FieldPath.documentId(), '==', id)
  }

  const handleDataPost = async () => {
    postData(className,students,subject);
    handleClose();
    alert('The new class was added successfully!');
    db.collection('users').doc(uid).update({
      meetings: firebase.firestore.FieldValue.arrayUnion(postId)
    })
    setPostId(prevPostId => uuidV4());
    // await data.dispatch(refresh());
    await getReady();
    forceUpdate();
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
          {/* <Button color="primary" variant="contained" onClick={()=>console.log(students)}>
            console log
          </Button> */}
          {/* <Button onClick={handleClose} color="primary" variant="contained">
            Cancel
          </Button> */}
          <Button onClick={()=>handleDataPost()} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
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