import React from 'react';
import {  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import PostAddIcon from '@material-ui/icons/PostAdd';
import ScheduleIcon from '@material-ui/icons/Schedule';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 200,
//     // backgroundColor: theme.palette.background.paper,
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

export default function NewPostList() {
  // const classes = useStyles();


  return (
        <div>
            <List
            // component="nav"
            aria-labelledby="nested-list-subheader"
            // className={classes.root}
            >
            <ListItem button onClick={()=>console.log('salut metge!')}>
                <ListItemIcon>
                    <h1>ceva</h1>
                </ListItemIcon>
                <ListItemText primary="Add a new document" style={{color:"white"}}/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ScheduleIcon color="secondary"/>
                </ListItemIcon>
                <ListItemText primary="Schedule a new meeting" style={{color:"white"}}/>
            </ListItem>
            </List>
        </div>


  );
}