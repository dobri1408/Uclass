import React, {useEffect, useRef, useState} from 'react';
import NavbarStudent from './NavbarStudent'; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardContent';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { data } from '../../store/data';

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


export default function Profile(props) {
  const forceUpdate = useForceUpdate();


  return (
    <>
      <NavbarStudent/>
      {/* <Button variant='contained' id='getData' onClick={()=>forceUpdate()}>
        click once to make me work!
      </Button> */}
      <Button variant='contained' id='getData' onClick={()=>console.log(data.getState())}>
        getState()
      </Button>
      {
        ('userData' in data.getState()) ?
        <>
          <h1>first Name: {data.getState().userData.firstName}</h1>
          <h1>last Name: {data.getState().userData.lastName}</h1>
          <h1>Phone: {data.getState().userData.phone}</h1>
          <img src={data.getState().userData.profilePhoto} alt='https://cevaRandom.com'/>
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
              }} onMouseMove={forceUpdate}/>
            <Grid item xs={6}>
            </Grid>
          </Grid>
            
        </>
      }

      

    </>
  )


}
