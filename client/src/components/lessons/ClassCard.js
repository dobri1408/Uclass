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
import {useHistory, Link} from 'react-router-dom';

export default function ClassCard (props) {
    const history = useHistory();
    const colors = [deepOrange[500],deepPurple[500],red[500]]
    return (
        <Grid item xs={4}>
            <Card style={{maxWidth: 345}}>
                <CardHeader
                    title={props.className}
                    avatar={
                        <Avatar aria-label="recipe" style={{backgroundColor: colors[props.className.charAt(0).charCodeAt(0)%3]}}>
                          {props.className.charAt(0)}
                        </Avatar>
                      }
                />
                <CardContent style={{minHeight: 200}}>
                    <Typography variant="body2" color="textPrimary" component="p">
                        Subject: {props.subject}. Click the icons below to see all the participants
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link
                        to={{
                            pathname: `classrooms/${props.className}`,
                            state: {name: props.className}
                        }}
                    >
                        <IconButton>
                            <LaunchIcon/>
                        </IconButton>
                    </Link>
                    <Students students={props.students}/>
                </CardActions>
            </Card>
        </Grid>

    )
}