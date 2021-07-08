import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DoneIcon from '@material-ui/icons/Done';
import { Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';


const Message = ({info}) => {
    const [seen, setSeen] = useState(false);
    return (
        <Grid container style={{paddingTop: 20, paddingBottom: 20}}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <Card>
                        <CardHeader
                            avatar={
                                <Avatar style={{color: '#fff', backgroundColor: red[500]}}>
                                    <MessageIcon />
                                </Avatar>
                            }
                            titleTypographyProps={{variant:'h4' }}
                            title="New message from the teacher ..."
                        />
                        <CardContent>
                            <Typography>
                                {info.message}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {
                                seen === true ? 
                                <>
                                <IconButton>
                                <DoneIcon/>
                                </IconButton>
                                <Typography>
                                    Marked as seen!
                                </Typography>
                                </>
                                 : 
                                <>
                                <IconButton onClick={()=>setSeen(true)}>
                                <VisibilityIcon/>
                                </IconButton>
                                <Typography>
                                    Mark as read!
                                </Typography>
                                </>
                            }
                            {/* <IconButton>
                                <VisibilityIcon/>
                            </IconButton> */}
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
    )
}


export default Message;