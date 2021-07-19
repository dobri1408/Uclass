import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import NavbarProf from '../NavbarProf';
// import NewPost from './NewPost';
import Button from '@material-ui/core/Button';
// import GeneralCard from './MeetingCards/GeneralCard';
import ScheduledMeeting from './ScheduledMeeting';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
// import Schedule from './Schedule';
// import NewMeeting from './NewMeeting';


// import { db, auth } from '../firebase/firebase';

import Navbar from './Navbar';

export default function Classroom (props) {
    // const firebaseData = useRef([]);
    // const data = useRef([]);
    // const timestamps = useRef([]);
    // const startDates = useRef([]);
    const sortedData = useRef([]);
    const currentClassName = useRef('');
    // const meetingsData = useRef([]);
    const currentClassInfo = useRef([]);
    const currentClassHash = useRef('');
    // const [hash, setHash] = useState('');
    // const [sortedData2, setSortedData2] = useState([]);
    // const [classInfo, setClassInfo] = useState(null);
    const [titles, setTitles] = useState([])
    const { state } = useLocation();
    
    const [currentButton, setCurrentButton] = useState('activity');
    
    currentClassName.current = state.name;
    
    const getData = async () => {
        // await auth.onAuthStateChanged((user)=>{
        //     if(user) {
        //       db.collection('users').doc(user.uid).get().then((snap)=>{
        //           if(snap.exists) {
        //             firebaseData.current = snap.data();
        //             firebaseData.current.meetings.forEach((element)=>{
        //               db.collection("meetings").doc(element).get().then((doc)=>{
        //                 if(doc.exists) {
        //                   if(doc.data().className === currentClassName.current) {
        //                     currentClassHash.current = doc.id;
        //                     setHash(doc.id);
        //                     db.collection('meetings').doc(doc.id).get().then((snap)=>{
        //                         if(snap.exists) {
        //                             currentClassInfo.current = snap.data();
        //                             setClassInfo(currentClassInfo.current);
        //                             setTitles(currentClassInfo.current.titles);
        //                         }
        //                     })
        //                   }  
        //                 } else {
        //                   console.log('no hash found!')
        //                 }
        //               })
        //             })
        //             data.current = [...snap.data().dates, ...snap.data().messages,...snap.data().files];
        //                 [...snap.data().dates, ...snap.data().messages,...snap.data().files].forEach((element)=>{
        //                     if(timestamps.current.length < [...snap.data().dates, ...snap.data().messages, ...snap.data().files].length)
        //                         timestamps.current = [...timestamps.current, element.timestamp]

                            
        //                 })
        //             let copy = timestamps.current;
        //             copy.sort();
        //             timestamps.current = copy;
        //             timestamps.current.forEach((element,index)=>{
        //                 data.current.forEach(i => {
        //                     if(i.timestamp === element && sortedData.current.length < data.current.length) {
        //                         sortedData.current.push(i);
        //                     }
        //                 })
        //             })
                    
                    
        //           }
        //         setSortedData2(prevSortedData2 => sortedData.current)
        //       }) 


            

        //     } 
        // })
    }
    useEffect((state)=>{
        getData();
        console.log(props.data)
        console.log(currentClassName.current)
        props.data.meetingsData.forEach((element, index) => {
            if(element.className === currentClassName.current) {
                setTitles(element.titles);
                currentClassInfo.current = element;
                currentClassHash.current = props.data.userData.meetings[index]
            }
        })
    },[]);


    return (
        <>
            <NavbarProf feed={{title: state.name}} change={setTitles}/>
            {/* <Button variant='contained' onClick={()=>console.log(props.data)}>
                ceva
            </Button> */}
            

            <Grid container style={{marginTop:30}}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                    <Card style={{backgroundColor: '#2A333A'}}>
                        <Navbar f={setCurrentButton} v={currentButton}/>
                        <CardContent style={{backgroundColor: '#345F65'}}>

                            {
                                titles.length !== 0 ? 
                                
                                titles.sort((a,b)=>(a.start > b.start) ? -1 : 1).map((element, index)=>{
                                    return (
                                    <ScheduledMeeting 
                                        info={titles[index]} 
                                        hash={currentClassHash.current} 
                                        classInfo={currentClassInfo.current} 
                                        key={index}
                                        currentButton={currentButton}
                                    />)
                                }):
                                <Grid container>
                                    <Grid item xs={6}>
                                    </Grid>
                                        <CircularProgress style={{marginTop: 25, marginBottom: 25, color: '#D99152'}}/>
                                    <Grid item xs={6}>
                                    </Grid>
                                </Grid>
                            }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={1}>
                </Grid>
            </Grid>

            


            {/* {
                sortedData2.length !==0 ? 
                sortedData2.slice(0).reverse().filter((el)=>el.classHash === hash ).map((element)=>{
                    return(<GeneralCard info={element} name={state.name}/>)
                }) 
                : 
                <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>
            } */}
        </>
    )
}