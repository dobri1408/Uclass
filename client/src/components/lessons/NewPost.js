import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import {Container} from '@material-ui/core';
import {Grid} from '@material-ui/core'
import NewPostList from './NewPostList';




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //   duration: theme.transitions.duration.shortest,
    // }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));




export default function NewPost({name,data}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
        }}>
            
            
        </div>  
    {/* <Container> */}
    <Grid container direction="row" alignItems="center">
    <Grid item xs={2}></Grid>
    <Grid item >
        <IconButton
        className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
        <ExpandMoreIcon color="secondary"/>
        </IconButton>
    </Grid>
    <Grid item >
        <h5 style={{color:"black"}}>Click the arrow to add a new post to your feed</h5>
    </Grid>
    </Grid>
                

                
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <NewPostList name={name} data={data}/>
      </Collapse>
    {/* </Container> */}

    </div>
  );
}