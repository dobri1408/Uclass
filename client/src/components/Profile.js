import React, {useContext} from 'react';
import NavbarProf from './NavbarProf';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DataContext } from '../App';





export default function Profile(props) {

  const data = useContext(DataContext);

  return (
    <>
      <NavbarProf/>
      <Button variant='contained' onClick={()=>console.log(data)}>
        dai
      </Button>
      {
        props.data.userData !== [] ?
        <>


          <Grid container style={{marginTop: 25}}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
          <Card>
            <CardHeader
              avatar={
                <Avatar style={{color: 'red'}}>
                  R
                </Avatar>
              }
            />
            <CardContent style={{backgroundColor: '#345F65'}}>
              <Typography>
                ceva
              </Typography>
            </CardContent>
          </Card>

            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>

          {/* <h1>first name {userData.firstName}</h1>
          <h1>last name {userData.lastName}</h1>
          <h1>email {userData.email}</h1>
          <h1>phone no. {userData.phone}</h1> */}
          
          {/* <img src={userData.profilePhoto} alt='nu ai poza' heigth="300" width="300"/> */}


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
