import React, { useState, useEffect, useRef } from 'react';
import NavbarProf from '../NavbarProf.js';
// import Button from '@material-ui/core/Button';
// import { db, auth } from '../firebase/firebase';

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
import Button from '@material-ui/core/Button';


const TeacherTimetable = (props) => {
    const [currentDate, setCurrentDate] = useState('2021-07-04');
    const [readyData, setReadyData] = useState([]);
    const final = useRef([]);
    
    useEffect(()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        setCurrentDate(yyyy + '-' + mm + '-' + dd);

        props.data.meetingsData.forEach((element, index) => {
            if(element.titles !== []) {
                element.titles.forEach((e)=>{
                    final.current.push({
                        title: e.title,
                        startDate: new Date(e.start * 1000),
                        endDate: new Date(e.end * 1000),
                        id: index,
                        location: 'Room 1'
                    })
                })
            }
            setReadyData(prevReadyData => [...readyData, ...final.current])
        })
           
    },[])


    return (
        <div>
            <NavbarProf/>
            {/* <Button variant='contained' onClick={()=>console.log(readyData)}>
                cv
            </Button> */}
            {
                readyData.length !== 0 ?
                <Paper style={{marginTop: 25}}>
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