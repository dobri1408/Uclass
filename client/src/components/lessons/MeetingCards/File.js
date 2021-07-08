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

const File = (props) => {
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
                    title={`A new document was uploaded for meeting ${props.name}`}
                />
                <CardContent>
                    <Typography>
                        The teacher uploaded a new file named {props.info.fileName}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton onClick={()=>window.open(`${props.info.link}`)}>
                        <GetAppIcon/>
                    </IconButton>
                    <Typography>
                        Download file {props.info.fileName}
                    </Typography>
                </CardActions>
            </Card>
        </Grid>
        <Grid item xs={2}>
        </Grid>
    </Grid>
    )
}


export default File;