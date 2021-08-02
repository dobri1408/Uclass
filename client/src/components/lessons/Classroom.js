import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import NavbarProf from '../NavbarProf';
import Button from '@material-ui/core/Button';
import ScheduledMeeting from './ScheduledMeeting';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import { data, refresh } from '../../store/data';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Navbar from './Navbar';


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
  }


export default function Classroom (props) {
    const forceUpdate = useForceUpdate();
    const currentClassName = useRef('');
    const currentClassInfo = useRef([]);
    const currentClassHash = useRef('');
    const [titles, setTitles] = useState([])
    const { state } = useLocation();
    const [currentButton, setCurrentButton] = useState('activity');
    const [aux2, setAux2] = useState(0);
    currentClassName.current = state.name;    

    const p = () => {
        data.getState().meetingsData.forEach((element, index) => {
            if(element.className === currentClassName.current) {
                setTitles(element.titles); 
                currentClassInfo.current = element;
                currentClassHash.current = data.getState().meetingsIDs[index]
            }
        })

    }
    useEffect((state, meetingsData, userData)=>{
        p();
    },[]);
    useEffect(() => {
        console.log("fdfdnjk");
        forceUpdate();p();forceUpdate()
    },[props.aux2])


    return (
        <>
            <NavbarProf feed={{title: state.name}} change={setTitles} aux2={aux2} setAux2={setAux2} />
          
            {/* <Button variant="contained" onClick={()=>console.log(data.getState())}>
                click !
            </Button>
            <Button variant="contained" onClick={()=>console.log(currentClassInfo.current)}>
                show hash
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
                                    <Grid item xs={4}>
                                    </Grid>
                                    <div style={{diplay:'flex',alignItems: 'center', justifyContent: 'center'}}>
                                 <h1 style ={{color: 'white'}}>There is no lesson created for this class </h1>
                           
                                   </div>
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
    </>
    )
}