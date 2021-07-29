import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { green } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import app from '../firebase/firebase';
import { auth, db } from '../firebase/firebase'; 
import firebase from "firebase/app";
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import {useAuth } from '../contexts/AuthContext'
import { useLocation } from 'react-router-dom';
import {data} from '../../store/data'

const useStyles = makeStyles((theme) => ({
  root: {
      backgroundColor: '#D99152',
      border: 'none',
      boxShadow: 'none'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[500],
  },
}));

export default function ScheduledMeetingStudent(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [meetingExpand, setMeetingExpand] = useState(false);
    const [documentsExpand, setDocumentsExpand] = useState(false);
    const [boardExpand, setBoardExpand] = useState(false);
    const firstNameUser = useRef("");
    const userId = useRef("");
    const hiddenFileInput = useRef(null);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMeetingExpandClick = () => {
        setMeetingExpand(!meetingExpand);
    }

    const handleBoardExpandClick = () => {
        setBoardExpand(!boardExpand);
    }
    const handleDocumentsExpandClick = () => {
        setDocumentsExpand(!documentsExpand);
    }

  const timeConverter = (UNIX_timestamp) =>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
  }
  return (
    <>  
        
        <Grid container style={{paddingTop: 20, paddingBottom: 20}}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
        <Card className={classes.root}>
        <CardHeader
            avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
                {props.info.title[0]}
            </Avatar>
            }
            action={
            //     <IconButton aria-label="settings">
            //     <MoreVertIcon />
            // </IconButton>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={()=>{
                handleExpandClick();
            }
            }
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
            }
            title={props.info.title}
            subheader={timeConverter(props.info.start)}
            />
 

        {
            props.currentButton === 'activity' &&
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {/* <Navbar/> */}
                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                <div style={{padding: 25, paddingTop: 25, paddingBottom: 10}}>
                <CardHeader
                    action={
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: meetingExpand,
                        })}
                        onClick={handleMeetingExpandClick}
                        aria-expanded={meetingExpand}
                        aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    }
                    style={{backgroundColor: '#F2C894'}}
                    title='Meeting'
                />
                <Collapse in={meetingExpand} timeout="auto" unmountOnExit>
                    <Card style={{border: 'none', boxShadow: 'none', borderRadius: 0}}>
                        <CardContent>
                            {
                                props.info.start > (Date.now() / 1000 | 0) ?
                                <h2>The meeting will take place on {timeConverter(props.info.start)}. Click the button below to go to the meeting!</h2> :
                                <h2>The meeting took place on {timeConverter(props.info.start)}.</h2>
                            }
                        </CardContent>
                        <CardActions>
                            {
                                props.info.start > (Date.now() / 1000 | 0) &&
                                <IconButton onClick={()=>window.open(`https://164.90.202.151/${props.info.timestamp}name${data.getState().userData.firstName}`)}>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            }
                        </CardActions>
                    </Card>
                </Collapse>
                </div>
                </Card>


                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                        <div style={{padding: 25, paddingTop: 10, paddingBottom: 10}}>
                <CardHeader
                    action={
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: documentsExpand,
                        })}
                        onClick={handleDocumentsExpandClick}
                        aria-expanded={documentsExpand}
                        aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    }
                    style={{backgroundColor: '#F2C894'}}
                    title='Document'
                />
                <Collapse in={documentsExpand} timeout="auto" unmountOnExit>
                <Card style={{border: 'none', boxShadow: 'none', borderRadius: 0}}>
                    <CardContent>
                        <CardHeader
                            action={
                                <IconButton
                                onClick={()=>window.open(`/documents/${props.info.timestamp}`)}
                                >
                                    <AssignmentIcon/>
                                </IconButton>
                            }
                            style={{backgroundColor: '#D99152'}}
                            title='Click icon to go to document'
                        />
                    </CardContent>
                </Card>
                </Collapse>
                </div>
                </Card>


                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                        <div style={{padding: 25, paddingTop: 10, paddingBottom: 25}}>
                <CardHeader
                    action={
                        <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: boardExpand,
                        })}
                        onClick={handleBoardExpandClick}
                        aria-expanded={boardExpand}
                        aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    }
                    style={{backgroundColor: '#F2C894'}}
                    title='Board'
                />
                <Collapse in={boardExpand} timeout="auto" unmountOnExit>
                    <Card style={{border: 'none', boxShadow: 'none', borderRadius: 0}}>
                        <CardContent>
                            <CardHeader
                                action={
                                    <IconButton
                                    onClick={()=>window.open(`http://localhost:5000/whiteboard?roomId=${props.info.timestamp}$1`)}
                                    >
                                        <CreateIcon/>
                                    </IconButton>
                                }
                                style={{backgroundColor: '#D99152'}}
                                title='Click icon to go to board'
                            />
                        </CardContent>
                    </Card>
                </Collapse>
                </div>
                </Card>




            </Collapse>
        }


        {
            props.currentButton === 'homework' &&
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                    {
                        props.classInfo.homework.filter(e=>e.title===props.info.title).length === 0 &&
                        // props.classInfo.homework.length === 0 &&
                        <div style={{padding: 25, paddingTop: 25, paddingBottom: 10}}>
                        <CardHeader
                            style={{backgroundColor: '#F2C894'}}
                            title='No homework added so far. YAAAY!'
                        />
                        </div>
                    }
                </Card> 
                {
                    props.classInfo.homework.length !== 0 &&
                    props.classInfo.homework.filter(element => element.title === props.info.title).map((element,index)=>{

                        return(

                            <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                                <div style={{padding: 25, paddingTop: 10, paddingBottom: 25}}>
                                <CardHeader
                                    action={
                                        <IconButton
                                        // onClick={()=>window.open(`${element.link}`)}
                                        onClick={()=>console.log(props)}
                                        // aria-expanded={meetingExpand}
                                        aria-label="download"
                                        >
                                            <GetAppIcon/>
                                        </IconButton>
                                    }
                                    style={{backgroundColor: '#F2C894'}}
                                    title={element.fileName}
                                />
                                </div>
                            </Card>
                        )

                    })
                }


            </Collapse>
        }


        {
            props.currentButton === 'tests' &&
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                <div style={{padding: 25, paddingTop: 25, paddingBottom: 10, marginBottom: 15}}>
                <CardHeader
                    style={{backgroundColor: '#F2C894'}}
                    title='Coming soon...'
                />
                </div>
                </Card>

            </Collapse>
        }
        </Card>
        </Grid>
        <Grid item xs={1}>
        </Grid>
        </Grid>
    </>
  );
}