import React, {useEffect, useState} from 'react';
import NavbarProf from '../NavbarProf';
import Grid from '@material-ui/core/Grid';
import ClassCard from './ClassCard';
import './icons.css';
import Container from '@material-ui/core/Container';
import { data } from '../../store/data';
import Button from '@material-ui/core/Button'; 
import { CircularProgress } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';



function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}



export default function Class (props)  {
  const forceUpdate = useForceUpdate();
  const [aux, setAux] = useState(0);  
  const [open, setOpen] = useState(false);


  useEffect(()=>{
    forceUpdate();
  },[aux])

  return (
    <div>
      {
        ('meetingsData' in data.getState()) ?
        <NavbarProf classes={{title: `Welcome, ${data.getState().userData.firstName}`}} aux={aux} setAux={setAux} />:
        <NavbarProf classes={{title: 'Welcome!'}} aux={aux} setAux={setAux} />
      }
      {/* <IconButton onClick={()=>forceUpdate()} style={{marginTop: 10, marginLeft: 10}}>
        <RefreshIcon style={{transform:'scale(1.5)'}}/>
      </IconButton>


      <Button variant="contained" onClick={()=>console.log(data.getState())}>
        open data.getState() 
      </Button> */}

      <Container style={{marginTop: "auto"}}>
      <Grid container spacing={3} style={{marginTop: 25}}>

      {
        ('meetingsData' in data.getState()) ?
        <>
        {
        data.getState().meetingsData
        .filter((e,i)=>data.getState().userData.meetings.includes(data.getState().meetingsIDs[i]))
        .map((e,index)=>{
          return(
            <ClassCard className={e.className} subject={e.subject} students={e.students} key={index}/>
          )
        })
        }



        


        </>:
        <>
        <Grid container spacing={0}>
          <Grid item xs={6}>
          </Grid>

            <CircularProgress style={{
              width: 500, 
              height: 500, 
              marginTop: 100, 
              color: '#D99152', 
              marginLeft: -250
            }}/>
          <Grid item xs={6}>
          </Grid>
        </Grid>
          
      </>
      }

      </Grid>
      </Container>
      
    </div>
  )
}

