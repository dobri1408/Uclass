import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import NavbarProf from '../NavbarProf';
import NewPost from './NewPost';
import Button from '@material-ui/core/Button';
import GeneralCard from './MeetingCards/GeneralCard';
import ScheduledMeeting from './ScheduledMeeting';

import { db, auth } from '../firebase/firebase';


export default function Classroom () {
    const firebaseData = useRef([]);
    const data = useRef([]);
    const timestamps = useRef([]);
    const sortedData = useRef([]);
    const currentClassName = useRef('');
    // const meetingsData = useRef([]);
    const currentClassInfo = useRef(null);
    const currentClassHash = useRef('');
    const [hash, setHash] = useState('');
    const [sortedData2, setSortedData2] = useState([]);
    const [classInfo, setClassInfo] = useState(null);
    const [titles, setTitles] = useState([])
    const { state } = useLocation();
     
    currentClassName.current = state.name;
    
    useEffect((state)=>{
        const getData = async () => {
            await auth.onAuthStateChanged((user)=>{
                if(user) {
                  db.collection('users').doc(user.uid).get().then((snap)=>{
                      if(snap.exists) {
                        firebaseData.current = snap.data();
                        firebaseData.current.meetings.forEach((element)=>{
                          db.collection("meetings").doc(element).get().then((doc)=>{
                            if(doc.exists) {
                              if(doc.data().className === currentClassName.current) {
                                currentClassHash.current = doc.id;
                                setHash(doc.id);
                                db.collection('meetings').doc(doc.id).get().then((snap)=>{
                                    if(snap.exists) {
                                        currentClassInfo.current = snap.data();
                                        setClassInfo(currentClassInfo.current);
                                        setTitles(currentClassInfo.current.titles);
                                    }
                                })
                              }  
                            } else {
                              console.log('no hash found!')
                            }
                          })
                        })
                        data.current = [...snap.data().dates, ...snap.data().messages,...snap.data().files];
                            [...snap.data().dates, ...snap.data().messages,...snap.data().files].forEach((element)=>{
                                if(timestamps.current.length < [...snap.data().dates, ...snap.data().messages, ...snap.data().files].length)
                                timestamps.current = [...timestamps.current, element.timestamp]
                            })
                        let copy = timestamps.current;
                        copy.sort();
                        timestamps.current = copy;
                        timestamps.current.forEach((element,index)=>{
                            data.current.forEach(i => {
                                if(i.timestamp === element && sortedData.current.length < data.current.length) {
                                    sortedData.current.push(i);
                                }
                            })
                        })
                        
                        
                      }
                    setSortedData2(prevSortedData2 => sortedData.current)
                  }) 


                

                } 
            })
        }
        getData()
    },[]);


    return (
        <>
            <NavbarProf/>

            <Button variant="contained" color="secondary" onClick={()=>console.log(classInfo)}>
                test
            </Button>


            <h1 style={{color:"white", textAlign: "center", paddingTop: "50px"}}>This is the feed page for {state.name}</h1>
            <NewPost name={state.name} data={firebaseData}/>


            {
                titles.length !== 0 ? 
                titles.map((element, index)=>{
                    return <ScheduledMeeting info={titles[index]} sortedData={sortedData.current}/>
                }):
                <h1>loading</h1>
            }
            {
                sortedData2.length !==0 ? 
                sortedData2.slice(0).reverse().filter((el)=>el.classHash === hash ).map((element)=>{
                    return(<GeneralCard info={element} name={state.name}/>)
                }) 
                : 
                <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>
            }
        </>
    )
}