// import React, {useState,useEffect,useRef} from 'react';
import React from 'react';
import NavbarProf from '../NavbarProf';
import {
  Grid,
  // Button,
} from '@material-ui/core';
// import { db, auth } from '../firebase/firebase';
import ClassCard from './ClassCard';
import './icons.css';
// import NewClass from './NewClass';
import Container from '@material-ui/core/Container';



export default function Class (props)  {
  // const [data, setData] = useState([]);
  // const [meetingsData, setMeetingsData] = useState([]);
  // const mData = useRef([]);
  // const getData = () => {
  //   db.collection('meetings').get().then((snapshot)=>{
  //     setData(prevData => snapshot.docs)
  //   });
    
  // }

  

  // useEffect(()=>{
  //   const getReady = () => {
  //     auth.onAuthStateChanged((user)=>{
  //       if(user) {
  //         db.collection('users').doc(user.uid).get().then((snap)=>{
  //             if(snap.exists) {
  //               mData.current = snap.data();
  //               setMeetingsData(prevMeetingsData => snap.data())
  //             } 
  //           });
  //         }
  //         db.collection('meetings').get().then((snapshot)=>{
  //           setData(prevData => snapshot.docs)
  //         });
  //       });

  //     db.collection('meetings').get().then((snapshot)=>{
  //       setData(prevData => snapshot.docs)
  //     });

  //     //where('uid','==',user.uid)

  //   }
  //   getReady();
  // },[])
  
   return (
     <div>
        <NavbarProf classes={{title: 'Welcome, ..'}}/>


        <Container style={{marginTop: "auto"}}>
        <Grid container spacing={3} style={{marginTop: 25}}>

        {/* {

          data.length !== 0 && meetingsData.meetings !== undefined ? 
          data.filter(element => meetingsData.meetings.includes(element.id)).map(element => {
            return(<ClassCard className={element.data().className} subject={element.data().subject} students={element.data().students} data={data}/>)
          
          }) : <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>

          //chained filter and map. please do not modify unless you know what you are doing!
          
        } */}

        {

        props.data.meetingsData.length !== 0 ? 
        props.data.meetingsData.map(element => {
          return(<ClassCard className={element.className} subject={element.subject} students={element.students} />)

        }) : <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>

        }


        </Grid>
        </Container>
        
     </div>
   )
}

