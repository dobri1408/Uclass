import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/People';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const Message = ({info}) => {
    const timeConverter = (UNIX_timestamp) =>{
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        var time = date + ' ' + month + ' ' + year + ' ' + 'at ' + ':' + min + ':' + sec ;
        return time;
      }
      const timeConverter2 = (UNIX_timestamp) =>{
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
      }
    return (
        <Grid container style={{paddingTop: 20, paddingBottom: 20}}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar style={{color: '#fff', backgroundColor: pink[500]}}>
                                    <PeopleIcon />
                                </Avatar>
                            }
                            titleTypographyProps={{variant:'h4' }}
                            title={`A new meeting was scheduled for ${timeConverter2(info.start)}`}
                        />
                        <CardContent>
                            <Typography>
                                The new meeting is set to begin on {timeConverter(info.start)} and end on {timeConverter(info.end)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton onClick={()=>console.log(timeConverter(info.start))}>
                                <ArrowForwardIcon/>
                            </IconButton>
                            <Typography>
                                Go to meeting!
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>

    )
}


export default Message;