import React from 'react';
import { 
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    CardActions,
    Avatar,
    IconButton,
} from '@material-ui/core';
import Students from './Students';
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';
import LaunchIcon from '@material-ui/icons/Launch';
import {Link} from 'react-router-dom';
import Schedule from './Schedule';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
    main: {
        backgroundColor: '#345F65',
        '&:hover': {
          backgroundColor: '#D99152',
        }
      }
});


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
                                Click me to go to the class!
                            </Typography>
                            <Typography style={{color: 'white', fontSize: 15, fontWeight: 600}}>
                                Below you can see the students of this class
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
                            <Students students={props.students}/>
                        </CardActions>


            </Card>
        </Grid>

    )
}


