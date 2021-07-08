import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import GetAppIcon from '@material-ui/icons/GetApp';
import AssignmentIcon from '@material-ui/icons/Assignment';

const Message = () => {
    return (
        <Grid container style={{paddingTop: 20, paddingBottom: 20}}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar style={{color: '#fff', backgroundColor: green[500]}}>
                            <AssignmentIcon />
                        </Avatar>
                    }
                    titleTypographyProps={{variant:'h4' }}
                    title="Document ${} for meeting ${}"
                />
                <CardContent>
                    <Typography>
                        The teacher uploaded a new pdf/word/... named ...
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton>
                        <GetAppIcon/>
                    </IconButton>
                    <Typography>
                        Download file ${}
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