import React, {useState, useRef, useEffect} from 'react';
import {  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Container from '@material-ui/core/Container';
import TimePickers from './TimePickers';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MessageIcon from '@material-ui/icons/Message';
import TextField from '@material-ui/core/TextField';
import { auth, db } from '../firebase/firebase'; 
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import firebase from "firebase/app";
import app from '../firebase/firebase';

export default function NewPostList({name,data}) {
    const [hidden, setHidden] = useState(false);
    const [textFieldStatus, setTextFieldStatus] = useState(false);
    const [uploadHidden, setUploadHidden] = useState(false);
    const [message, setMessage] = useState('');
    const currentClassHash = useRef('');
    const firebaseData = useRef('');
    const [fileUrl, setFileUrl] = useState(null);
    const handleMessage = () => {
        auth.onAuthStateChanged((user)=>{
            if(user) {
                db.collection('users').doc(user.uid).update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                        message: message,
                        classHash: currentClassHash.current,
                        timestamp: Date.now() / 1000 | 0,
                    })
                })
            }
        });
        alert('succes!');
        setMessage('');
        setTextFieldStatus(false);
    }

    const getCurrentHash = () => {
        firebaseData.current.forEach((element)=>{
          db.collection("meetings").doc(element).get().then((doc)=>{
            if(doc.exists) {
              if(doc.data().className === name) {
                currentClassHash.current = doc.id;
              }  
            } else {
              console.log('no hash found!')
            }
          })
        })
    }
    
    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user) {
              db.collection('users').doc(user.uid).get().then((snap)=>{
                  if(snap.exists) {
                    // setFirebaseData(prevFirebaseData => snap.data().meetings);
                    firebaseData.current = snap.data().meetings;
                  } 
                });
              }
            })
    })

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = app.storage().ref().child('files')
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file);
        let url = await fileRef.getDownloadURL();
        setFileUrl(await fileRef.getDownloadURL());
        auth.onAuthStateChanged((user)=>{
            if(user) {
                db.collection('users').doc(user.uid).update({
                    files: firebase.firestore.FieldValue.arrayUnion({
                        link: url,
                        classHash: currentClassHash.current,
                        timestamp: Date.now() / 1000 | 0,
                        fileName: file.name
                    })
                })
            }
        });
        alert('File was uploaded!');
        setUploadHidden(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
            <div>
                <Container>
                <List
                // component="nav"
                aria-labelledby="nested-list-subheader"
                // className={classes.root}
                style={{width: '100%', maxWidth: 200}}
                >
                <ListItem button onClick={()=>{setUploadHidden(!uploadHidden);getCurrentHash();}}>
                    <ListItemIcon>
                        <ScheduleIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Add a new document" style={{color:"white"}}/>
                </ListItem>
                {
                    uploadHidden &&
                    <form style={{width: 500}}>
                        <input type="file" onChange={(e)=>onFileChange(e)} />
                        <button onClick={(e)=>onSubmit(e)}>Submit</button>
                    </form>
                }

                <ListItem button onClick={()=>{setTextFieldStatus(!textFieldStatus); getCurrentHash()}}>
                    <ListItemIcon>
                        <MessageIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Add a new announcement!" style={{color:"white"}}/>
                </ListItem>
                {
                    textFieldStatus === true &&
                    <>
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={5}
                        defaultValue=""
                        variant="outlined"
                        onChange={(e)=>setMessage(e.target.value)}
                    />
                    <IconButton onClick={()=>handleMessage()}>
                        <SendIcon/>
                    </IconButton>
                    </>
                }
                <ListItem button onClick={()=>setHidden(!hidden)}>
                    <ListItemIcon>
                        <AddCircleOutlineIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Schedule a new meeting" style={{color:"white"}}/>
                </ListItem>
                {
                    hidden && 
                    <ListItem>
                        <TimePickers/>
                    </ListItem>
                }
                </List>
                </Container>
            </div>


    );
}