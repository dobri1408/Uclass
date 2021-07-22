import React, {useEffect, useRef, useState} from 'react';
import NavbarProf from './NavbarProf';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardContent';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { data } from '../store/data';
import {useHistory} from 'react-router-dom';

export default function Profile(props) {
  let history = useHistory();

  return (
    <>
      <NavbarProf/>
      <Button variant='contained' id='getData' onClick={()=>console.log(data.getState())}>
        console
      </Button>
      {
        data.getState() !== undefined ?
        <>


          <Grid container style={{marginTop: 25}}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
          {/* <Card>
            <CardHeader
              // avatar={
              //   <Avatar style={{color: 'red'}}>
              //     R
              //   </Avatar>
              // }
            />
            <CardContent style={{backgroundColor: '#345F65'}}>
              <Typography>
                ceva
              </Typography>
            </CardContent>
          </Card> */}

            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>

          <h1>first name {data.getState().userData.firstName}</h1>
          <h1>last name {data.getState().userData.lastName}</h1>
          <h1>email {data.getState().userData.email}</h1>
          <h1>phone no. {data.getState().userData.phone}</h1>
          
          <img src={data.getState().userData.profilePhoto} alt='nu ai poza' heigth="300" width="300"/>


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

    </>
  )

}
