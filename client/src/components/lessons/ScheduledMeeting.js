import React, {useState} from 'react';
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
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import File from './MeetingCards/File';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';
import Navbar from './Navbar';



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

export default function ScheduledMeeting(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [meetingExpand, setMeetingExpand] = useState(false);
  const [documentsExpand, setDocumentsExpand] = useState(false);
  const [boardExpand, setBoardExpand] = useState(false);

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
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8}>
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
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            >
            <ExpandMoreIcon />
            </IconButton>
            }
            title={props.info.title}
            subheader={timeConverter(props.info.start)}
            />
 

        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Navbar/>

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
                            props.info.start > Date.now() / 1000 | 0 ?
                            <h2>The meeting will take place on {timeConverter(props.info.start)}. Click the button below to go to the meeting!</h2> :
                            <h2>The meeting took place on {timeConverter(props.info.start)}.</h2>
                        }
                    </CardContent>
                    <CardActions>
                        <IconButton onClick={()=>console.log('go to meeting!')}>
                            <ArrowForwardIcon/>
                        </IconButton>
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
                title='Documents'
            />
            <Collapse in={documentsExpand} timeout="auto" unmountOnExit>
            <Card style={{border: 'none', boxShadow: 'none', borderRadius: 0}}>
                <CardContent>
                    <h1>DOCUMENTE o sa fie aici</h1>
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
                        <IconButton onClick={()=>console.log(props.sortedData)}>
                            <AddIcon/>
                        </IconButton>

                        <h1>slaut</h1>
                    </CardContent>
                </Card>
            </Collapse>
            </div>
            </Card>



        </Collapse>
        </Card>
        </Grid>
        <Grid item xs={2}>
        </Grid>
        </Grid>
    </>
  );
}