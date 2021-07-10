import React, {useState,useEffect} from 'react';
import NavbarProf from '../NavbarProf';
import {
  Grid,
  Button,
} from '@material-ui/core';
import { db, auth } from '../firebase/firebase';
import ClassCard from './ClassCard';
import './icons.css';
import NewClass from './NewClass';
import Container from '@material-ui/core/Container';


export default function Class ()  {
  const [data, setData] = useState([]);
  const [meetingsData, setMeetingsData] = useState([]);
  const getData = () => {
    db.collection('meetings').get().then((snapshot)=>{
      setData(prevData => snapshot.docs)
    });
    
  }

  

  useEffect(()=>{
    const getReady = async () => {

      await auth.onAuthStateChanged((user)=>{
        if(user) {
          db.collection('users').doc(user.uid).get().then((snap)=>{
              if(snap.exists) {
                setMeetingsData(prevMeetingsData => snap.data())
              } 
            });
          }
        });

        await db.collection('meetings').get().then((snapshot)=>{
          setData(prevData => snapshot.docs)
        });
      
      //where('uid','==',user.uid)

    }
    getReady();
  },[])
  
   return (
     <div>
        <NavbarProf/>

        {/* <Button variant="contained" color="primary" onClick={()=>postData("ceva",["ceva1","ceva2"],"CEva")}>
          Post new dummy data!
        </Button> */}

        <h3 style={{color:"white"}}>Click the plus button to add a new class</h3>
        <NewClass/>
        <Button variant="contained" color="primary" onClick={()=>{getData();refreshPage()}}>
          refresh (not auto yet!)
        </Button>
        {/* <Button variant="contained" color="primary" onClick={()=>{getData();refreshPage()}}>
          refresh
        </Button> */}
        <Container style={{marginTop: "auto"}}>
        <Grid container spacing={3}>
        {

          data.length !== 0 ? 
          data.filter(element => meetingsData.meetings.includes(element.id)).map(element => {
            return(<ClassCard className={element.data().className} subject={element.data().subject} students={element.data().students} data={data}/>)
          
          }) : <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>

          //chained filter and map. please do not modify unless you know what you are doing!
          
        }
        </Grid>
        </Container>
        
     </div>
   )
}

const refreshPage = ()=>{
  window.location.reload();
}
