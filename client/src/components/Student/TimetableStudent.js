import React, { useState, useEffect, useRef } from 'react';
import NavbarStudent from './NavbarStudent.js';
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
import { data } from '../../store/data';


const TimetableStudent = (props) => {
    const [currentDate, setCurrentDate] = useState('2021-07-04');
    const [readyData, setReadyData] = useState([]);
    const rData = useRef([]);
    const final = useRef([]);

    useEffect(()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        setCurrentDate(yyyy + '-' + mm + '-' + dd);


        data.getState().meetingsData.forEach((element, index) => {
            if(data.getState().userData.meetings.includes(data.getState().meetingsIDs[index])) {
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
    
                [...final.current].forEach(e=>{
                  if(!rData.current.includes(e)) {
                    rData.current = [...rData.current, e];
                  }
                })
            }
            setReadyData(rData.current);
        })
        
           
    },[])


    return (
        <div>
            <NavbarStudent/>
            <Button variant="contained" onClick={()=>console.log(data.getState())}>
                getState!
            </Button>
            {
                readyData !== [] ?
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
                        <TodayButton/>
                    <Appointments />
                    </Scheduler>
                </Paper>:
                <h1 style={{color:"black", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading calendar...</h1>
            }

        </div>    
    );
}

export default TimetableStudent;