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
import TextField from "@material-ui/core/TextField";
import {useEffect} from 'react'
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
import Typography from '@material-ui/core/Typography';

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
    const homeworkLink = useRef('');
    const redux = useRef({});
    const [homeworks, setHomeworks] = useState(props.classInfo.homework);
  
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleClick = async (e) => {
        hiddenFileInput.current.click();
        e.preventDefault();
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
    console.log(props.classInfo.className);
//Get the homework from the teacher when added without disconnected
/*
db.collection('meetings').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if( change.doc.data().className=== props.classInfo.className) {
           console.log( change.doc.data());
           for ( var i = 0; i < change.doc.data().homework.length;++i) {
            if(homeworks.filter(e=>e.fileName===change.doc.data().homework[i].fileName).length===0){
                console.log(change.doc.data().homework[i].fileName)
                setHomeworks(oldArray => [...oldArray, {title:change.doc.data().homework[i].title, fileName: change.doc.data().homework[i].fileName,link:change.doc.data().homework[i].fileName}]);

      
            }   
        }
        };
          
    })
})*/
useEffect( () => {
    
},[])    
    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        
        const storageRef = app.storage().ref().child('homework')
        const fileRef = storageRef.child(file.name)
        redux.current = data.getState();

        if(props.classInfo.homework.filter(e=>e.fileName===file.name).length===0) {
      
            fileRef.put(file).then(() => {
                fileRef.getDownloadURL().then(async (e) => {
                    homeworkLink.current = e;
                      db.collection('meetings').doc(props.hash).update({
                        homework: firebase.firestore.FieldValue.arrayUnion({
                            link: homeworkLink.current,
                            timestamp: Date.now() / 1000 | 0,
                            fileName: "student" +"&"+ data.getState().userData.firstName+ "*"+ data.getState().userData.lastName+ "$"+file.name,
                            title: props.info.title
                        })
                    }).then(()=>{
                        // data.change({
                            setHomeworks(oldArray => [...oldArray, {title:props.info.title, fileName: "student" +"&"+ data.getState().userData.firstName+ "*"+ data.getState().userData.lastName+ "$"+file.name,link:homeworkLink.current}]);

                        // });
                    })
                })
            });
            handleExpandClick();
            alert(`you uploaded ${file.name}`);
        } else {
            alert("file with this name already uploaded!")
        }
    }

    const timeConverter = (UNIX_timestamp) =>{
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var h = addZero(a.getHours());
        var m = addZero(a.getMinutes());
        var time = date + ' '  + month + ' ' + year + ' at ' + h +':' + m;
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
                                props.info.end+3600 > (Date.now() / 1000 | 0) ?
                                <h2>The meeting will take place on {timeConverter(props.info.start)}. Click the button below to go to the meeting!</h2> :
                                <h2>The meeting took place on {timeConverter(props.info.start)} -  {timeConverter(props.info.end)} .</h2>
                            }
                        </CardContent>
                        <CardActions>
                            {
                                props.info.end+3600 > (Date.now() / 1000 | 0) &&
                                <IconButton onClick={()=>window.open(`https://meeting.uclass.ro/${props.info.timestamp}name${data.getState().userData.firstName}`)}>
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
                                // onClick={()=>window.open(`/documents/${props.info.timestamp}`)}
                                onClick={()=>window.open(`https://docs.uclass.ro/documents/${props.info.timestamp}`)}
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
                                    onClick={()=>window.open(`https://board.uclass.ro/whiteboard?roomId=${props.info.timestamp}`)}
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
                    <div style={{padding: 25, paddingTop: 25, paddingBottom: 10}}>
                        <CardHeader
                            style={{backgroundColor: '#d99152'}}
                            title='Homework added by teacher'
                        />
                    </div>
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
                  
                  homeworks.length !== 0 &&
                  homeworks.filter(element => element.title === props.info.title).map((element,index)=>{
                        if(!element.fileName.includes("student"))
                        return(

                            <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                                <div style={{padding: 25, paddingTop: 10, paddingBottom: 25}}>
                                <CardHeader
                                    action={
                                        <IconButton
                                         onClick={()=>window.open(`${element.link}`)}
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
        <Card style={{borderRadius: 0, boxShadow: 'none', backgroundColor: '#f2f2f2'}}>
            <div style={{padding: 25, paddingTop: 25, paddingBottom: 10}}>
                <CardHeader
                    style={{backgroundColor: '#d99152'}}
                    title='Your solution'
                    />
            </div>
        </Card>   
    {/* <h1>Solve</h1> */}
                <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                    <div style={{padding: 25, paddingTop: 25, paddingBottom: 10}}>
                    <CardHeader
                        action={
                            <form>
                                <IconButton
                            
                                aria-label="add homework"
                                onClick={(e)=>handleClick(e)}
                                >
                                    <AddIcon/>
                                </IconButton>
                                <input type="file"
                                        ref={hiddenFileInput}
                                        style={{display:'none'}} 
                                        onChange={(e)=>onFileChange(e)}
                                />
                            </form>
                        }
                        style={{backgroundColor: '#F2C894'}}
                        title='Upload the homework!'
                    />
                    </div>
                </Card> 
                {
                  
                  homeworks.length !== 0 &&
                  homeworks.filter(element => element.title === props.info.title).map((element,index)=>{
                      if(element.fileName.includes("student") && element.fileName.includes(data.getState().userData.firstName) &&  element.fileName.includes(data.getState().userData.lastName)) {
                   var nameOfMyFile = new String()
                   var i = 0;
                   for (; i <element.fileName.length; ++i){ 
                    if(element.fileName.charAt(i) ==='$'){
                        break;
                    }
                }
                ++i;
                for ( ; i < element.fileName.length; ++i){  
                    nameOfMyFile += new String(element.fileName.charAt(i));
                }
                      return(

                          <Card style={{backgroundColor: '#F2F2F2', border: 'none', boxShadow: 'none', borderRadius: 0}}>
                              <div style={{padding: 25, paddingTop: 10, paddingBottom: 15}}>
                              <CardHeader
                                  action={
                                      <IconButton
                                       onClick={()=>window.open(`${element.link}`)}
                                      // aria-expanded={meetingExpand}
                                      aria-label="download"
                                      >
                                          <GetAppIcon/>
                                      </IconButton>
                                  }
                                  style={{backgroundColor: '#F2C894'}}
                                  title={nameOfMyFile}
                              />
                              </div>
                          </Card>
                      )

                  }})
                  
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