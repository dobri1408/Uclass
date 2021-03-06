import React from 'react';
import { 
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Avatar,
} from '@material-ui/core';
import Students from './Students';
import ClassCode from './ClassCode';
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';
import {Link} from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import {db, auth} from '../firebase/firebase';
import {data, change} from '../../store/data';
import AcUnitIcon from '@material-ui/icons/AcUnit';

const useStyles = makeStyles({
    main: {
        backgroundColor: '#345F65',
        '&:hover': {
          backgroundColor: '#D99152',
        }
      }
});


const getReady = async () => {
    await auth.onAuthStateChanged((user)=>{
      if(user){
        db.collection('users').doc(user.uid).get().then((snap)=>{
          if(snap.exists) {
            db.collection('meetings').get().then((s)=>{
              data.dispatch(change({
                userData: snap.data(),
                meetingsData: s.docs.map(e=>e.data()),
                meetingsIDs: s.docs.map(e=>e.id)
              }))
            })
          }
        
        })
      }
    })
  }

export default function ClassCard (props) {
    const colors = [deepOrange[500],deepPurple[500],red[500]]
    const classes = useStyles();
    return (
        <Grid item xs={4}>
            <Card style={{maxWidth: 345}}>
                <CardHeader
                    title={
                        <Typography style={{color: 'white', fontSize: 20, fontWeight: 600}}>
                            {props.className}
                        </Typography>
                    }
                    avatar={
                        <Avatar aria-label="recipe" style={{backgroundColor: colors[props.className.charAt(0).charCodeAt(0)%3]}}>
                          {props.className.charAt(0)}
                        </Avatar>
                      }
                    style={{backgroundColor: '#2A333A'}}
                />


                    <Link
                        to={{
                            pathname: `classrooms/${props.className}`,
                            state: {name: props.className}
                        }}
                        style={{ textDecoration: 'none' }}
                    >
                    <CardActionArea className={classes.main}>
                        <CardContent style={{minHeight: 200}}>
                            <Typography style={{color: 'white', fontSize: 20, fontWeight: 600}}>
                                Subject: {props.subject}
                            </Typography>
                            <Typography style={{color: 'white', fontSize: 40, fontWeight: 600}}>
                               Class Code :    {data.getState().meetingsData.filter(e=>e.className===props.className)[0].code}
                            </Typography>
                          
                        </CardContent>
                    </CardActionArea>
                    </Link>
                        <CardActions style={{backgroundColor: '#345F65'}}>
                            {/* <Link
                                to={{
                                    pathname: `classrooms/${props.className}`,
                                    state: {name: props.className}
                                }}
                            >
                                <IconButton>
                                    <LaunchIcon/>
                                </IconButton>
                            </Link> */}
                            {/* <Schedule info={props}/> */}
                            <ClassCode className={props.className}/>
                          
                        </CardActions>


            </Card>
        </Grid>

    )
}


