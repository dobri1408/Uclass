import React, {useState} from 'react';
import {  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Container from '@material-ui/core/Container';
import TimePickers from './TimePickers';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MessageIcon from '@material-ui/icons/Message';

export default function NewPostList() {
    const [hidden, setHidden] = useState(false);

    return (
            <div>
                <Container>
                <List
                // component="nav"
                aria-labelledby="nested-list-subheader"
                // className={classes.root}
                style={{width: '100%', maxWidth: 200}}
                >
                <ListItem button onClick={()=>console.log('add a new doc!')}>
                    <ListItemIcon>
                        <ScheduleIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Add a new document" style={{color:"white"}}/>
                </ListItem>
                <ListItem button onClick={()=>console.log('new announcement added!')}>
                    <ListItemIcon>
                        <MessageIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Add a new announcement!" style={{color:"white"}}/>
                </ListItem>
                <ListItem button onClick={()=>setHidden(!hidden)}>
                    <ListItemIcon>
                        <AddCircleOutlineIcon color="secondary"/>
                    </ListItemIcon>
                    <ListItemText primary="Schedule a new meeting" style={{color:"white"}}/>
                </ListItem>
                {
                    hidden && 
                    <ListItem>
                        <TimePickers/>
                    </ListItem>
                }
                </List>
                </Container>
            </div>


    );
}