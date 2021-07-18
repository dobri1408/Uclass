import React, { useState, useEffect, useRef } from 'react';
import NavbarProf from '../NavbarProf.js';
import Button from '@material-ui/core/Button';
import { db, auth } from '../firebase/firebase';

import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';



const TeacherTimetable = () => {
    // let d = new Date(0);
    const [currentDate, setCurrentDate] = useState('2021-07-04');
    const [firebaseData, setFirebaseData] = useState([]);
    const [readyData, setReadyData] = useState([]);
    const aux = useRef([]);
    const meetings = useRef([]);
    const final = useRef([]);
    // const readyData = useRef([]);
    // const firebaseData = useRef([]);
    
    useEffect(()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        setCurrentDate(yyyy + '-' + mm + '-' + dd);
        const getData = async () => {
            await auth.onAuthStateChanged((user)=>{
            if(user) {
                db.collection('users').doc(user.uid).get().then((snap)=>{
                    if(snap.exists) {
                    setFirebaseData(prevFirebaseData => snap.data());
                    // console.log(snap.data().dates.length)
                    // console.log(snap.data())
                    meetings.current = snap.data().meetings;
                    // snap.data().dates.forEach((element,index)=>{
    
                    //     if(aux.current.length < snap.data().dates.length) {
                    //         aux.current.push({
                    //                 title: element.className,
                    //                 startDate: new Date(element.start * 1000),
                    //                 endDate: new Date(element.end * 1000),
                    //                 id: index,
                    //                 location: 'Room 1'
                    //             })
                    //     }
                    // })
                    meetings.current.forEach((element, index)=>{
                        db.collection('meetings').doc(element).get().then((snap)=>{
                            if(snap.exists) {
                                // aux.current = [...aux.current, ...snap.data().titles];
                                snap.data().titles.forEach((element, index) => {
                                    final.current.push({
                                        title: element.title,
                                        startDate: new Date(element.start * 1000),
                                        endDate: new Date(element.end * 1000),
                                        id: index,
                                        location: 'Room 1'
                                    })
                                });
                                setReadyData(prevReadyData => [...readyData, ...final.current])
                                // aux.currrent.forEach((element, index) => {
                                //     final.current.push({
                                //         title: element.title,
                                //         startDate: new Date(element.start * 1000),
                                //         endDate: new Date(element.end * 1000),
                                //         id: index,
                                //         location: 'Room 1'
                                //     })
                                // })  
                                // console.log(final.current)                              

                            }
                        })
                    })
                } 
                });
                }
            });
        }
        getData();
    },[])


    return (
        <div>
            <NavbarProf/>
            <Button onClick={()=>console.log(readyData)}>
                ceva
            </Button>
            {
                readyData.length !== 0 ?
                <Paper>
                    <Scheduler
                    data={readyData}
                    height={660}
                    >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={(e)=>setCurrentDate(e)}
                    />
                    <WeekView
                        startDayHour={7}
                        endDayHour={22}
                    />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                    </Scheduler>
                </Paper>:
                <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading calendar...</h1>
            }


        </div>    
    );
}

export default TeacherTimetable;