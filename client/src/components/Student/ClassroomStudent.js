import React, { useEffect, useState, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import NavbarStudent from './NavbarStudent';
import NavbarClassroomStudent from './NavbarClassroomStudent';
import ScheduledMeetingStudent from './ScheduledMeetingStudent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { data } from '../../store/data';

const ClassroomStudent = (props) => {
    const {state} = useLocation();
    const currentClassName = useRef('');
    currentClassName.current = state.name;
    const currentClassInfo = useRef([]);
    const currentClassHash = useRef('');
    const [titles, setTitles] = useState([])
    const [currentButton, setCurrentButton] = useState('activity');


    const p = () => {
        data.getState().meetingsData.forEach((element, index) => {
            if(element.className === currentClassName.current) {
                setTitles(element.titles); 
                currentClassInfo.current = element;
                currentClassHash.current = data.getState().userData.meetings[index]
            }
        })
    }

    useEffect(()=>{
        p();
    },[])

    return(
        <div>
            <NavbarStudent/>
            <h1>
                sallut
            </h1>
            <Button variant="contained" onClick={()=>console.log(state)}>
                click me!
            </Button>

            <Grid container style={{marginTop:30}}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={10}>
                    <Card style={{backgroundColor: '#2A333A'}}>
                        <NavbarClassroomStudent f={setCurrentButton} v={currentButton}/>
                        <CardContent style={{backgroundColor: '#345F65'}}>

                            {
                                titles.length !== 0 ? 
                                
                                titles.sort((a,b)=>(a.start > b.start) ? -1 : 1).map((element, index)=>{
                                    return (
                                    <ScheduledMeetingStudent 
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


        </div>
    )
}

export default ClassroomStudent;