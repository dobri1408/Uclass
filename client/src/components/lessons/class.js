import React, {useEffect, useRef, useState} from 'react';
import NavbarProf from '../NavbarProf';
import {
  Grid
} from '@material-ui/core';
import ClassCard from './ClassCard';
import './icons.css';
import Container from '@material-ui/core/Container';
import { data } from '../../store/data';
import Button from '@material-ui/core/Button'; 

export default function Class (props)  {
  
  // const [ready, setReady] = useState(false);

  // useEffect(()=>{
  //   const getReady = () => {
  //     auth.onAuthStateChanged((user)=>{
  //       if(user){
  //         db.collection('users').doc(user.uid).get().then((snap)=>{
  //           u.current = snap.data();
  //           u.current.meetings.forEach((element)=>{
  //             db.collection('meetings').doc(element).get().then((s)=>{
  //               if(m.current.length < u.current.meetings.length) m.current.push(s.data());
  //             })
  //           })
  //           setUserData(u.current);
  //           setMeetingsData(m.current);
  //           setReady(true);
  //           })
  //         }
  //       })
  //     }
  //   getReady();
  // },[])

  // useEffect((userData, meetingsData)=>{
  //   const getReady = () => {
  //     auth.onAuthStateChanged((user)=>{
  //       if(user){
  //         db.collection('users').doc(user.uid).get().then((snap)=>{
  //           u.current = snap.data();
            
  //           snap.data().meetings.forEach((element)=>{
  //             db.collection('meetings').doc(element).get().then((s)=>{
  //               if(m.current.length < snap.data().meetings.length) m.current.push(s.data());
  //             })
  //           })
  //           setUserData(u.current);
  //           setMeetingsData(m.current);
  //         })
  //       }
  //     })
  //   }
  //   getReady();

  // },[])



   return (
     <div>
        <NavbarProf classes={{title: 'Welcome, ..'}}/>
        <Button variant="contained" onClick={()=>console.log(data.getState())}>
          click
        </Button>

        <Container style={{marginTop: "auto"}}>
        <Grid container spacing={3} style={{marginTop: 25}}>

        {/* {

          data.length !== 0 && meetingsData.meetings !== undefined ? 
          data.filter(element => meetingsData.meetings.includes(element.id)).map(element => {
            return(<ClassCard className={element.data().className} subject={element.data().subject} students={element.data().students} data={data}/>)
          
          }) : <h1 style={{color:"black", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>

          //chained filter and map. please do not modify unless you know what you are doing!
          
        } */}
        <ClassCard className={'test'} subject={'test'} students={'test'} key={'cddc'}/>
        {

        data.getState().meetingsData !== [] ? 
        data.getState().meetingsData.map((element, index) => {
          return(<ClassCard className={element.className} subject={element.subject} students={element.students} key={index}/>)
        }) : <h1 style={{color:"black", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>

        }



        </Grid>
        </Container>
        
     </div>
   )
}

