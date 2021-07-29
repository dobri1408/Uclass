import React, {useEffect, useRef, useState} from 'react';
import NavbarStudent from './NavbarStudent';
import UpdateProfileStudent from './UpdateProfileStudent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { data } from '../../store/data';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';




const timeConverter = (UNIX_timestamp) =>{
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}


function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}



export default function ProfileStudent(props) {
  const forceUpdate = useForceUpdate();
  const [feed, setFeed] = useState([]);
  const [aux, setAux] = useState(0);
  const auxFeed = useRef([]);
  const createReadyArray = () => {
    data.getState().meetingsData
    .filter((e,i)=>data.getState().userData.meetings.includes(data.getState().meetingsIDs[i]))
    .filter(e=>e.titles.length !== 0)
    .map(e=>e.titles)
    .forEach(e=>e.forEach(element=>{if(!auxFeed.current.includes(element)) {auxFeed.current.push(element)}}))
    setFeed(auxFeed.current.filter(e=>e.start>(Date.now() / 1000 | 0)))
  }

  const getAll = () => {
    if('userData' in data.getState()) {
      createReadyArray();
    }
  }

  useEffect(()=>{
    forceUpdate();
  },[aux])

  useEffect(()=>{
    if('userData' in data.getState()) {
      data.getState().meetingsData
      .filter((e,i)=>data.getState().userData.meetings.includes(data.getState().meetingsIDs[i]))
      .filter(e=>e.titles.length !== 0)
      .map(e=>e.titles)
      .forEach(e=>e.forEach(element=>{if(!auxFeed.current.includes(element)) {auxFeed.current.push(element)}}))
      setFeed(auxFeed.current.filter(e=>e.start>(Date.now() / 1000 | 0)))
    }
  },[])
  return (
    <>
      <NavbarStudent/>
      {/* <Button variant='contained' id='getData' onClick={()=>console.log(data.getState())}>
        click!
      </Button>
      <Button variant='contained' id='getData' onClick={()=>forceUpdate()}>
        refresh!
      </Button> */}
      {
        ('userData' in data.getState()) ?
        <>
          <Grid container >
            <Grid item xs={3}>
              <Card style={{backgroundColor: '#d99152', height: 0.8*window.innerHeight, borderRadius: 0}}>
                <CardContent>
                  <Card style={{backgroundColor: '#345f65', height: 0.34*window.innerHeight, borderRadius: 0, boxShadow: 'none'}}>
                    <CardContent>
                      {
                        data.getState().userData.profilePhoto === "" ?
                        <img 
                          src={"https://firebasestorage.googleapis.com/v0/b/azur-development.appspot.com/o/profile%2Fno_user.svg?alt=media&token=70c6376d-7603-4d19-8d14-363a25aef391"} 
                          alt={""}
                          style={{
                            borderRadius: '50%',
                            width: 300,
                            height: 300,
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            transform: 'scale(2)'
                          }}
                        />:
                        <img 
                          src={data.getState().userData.profilePhoto} 
                          alt={""}
                          style={{
                            borderRadius: '50%',
                            width: 300,
                            height: 300,
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                          }}
                        />
                      }
                    </CardContent>
                  </Card>
                  <Card style={{backgroundColor: '#345f65', height: 0.42*window.innerHeight, borderRadius: 0, boxShadow: 'none'}}>
                    <CardContent>
                      <Typography style={{color: "white", textAlign: "center", fontSize: 38}}>
                        Welcome, {data.getState().userData.firstName}!
                      </Typography>
                      <Typography style={{color: "white", fontSize: 30}}>
                        First Name: {data.getState().userData.firstName}
                      </Typography>
                      <Typography style={{color: "white", fontSize: 30}}>
                        Last Name: {data.getState().userData.lastName}
                      </Typography>
                      <Typography style={{color: "white", fontSize: 30}}>
                        Phone: {data.getState().userData.phone}
                      </Typography>
                      <UpdateProfileStudent setAux={setAux} aux={aux}/>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={9}>
              <Card style={{backgroundColor: '#345f65', height: 0.8*window.innerHeight, borderRadius: 0}}>
                <Card style={{
                  backgroundColor: '#2a333a', 
                  height: 0.8*window.innerHeight, 
                  width: 25,
                  position: 'absolute',
                  marginLeft: 75,
                  boxShadow: 'none',
                  borderRadius: 0
                }}><CardContent></CardContent></Card>
                <Card style={{
                  backgroundColor: '#2a333a', 
                  height: 0.8*window.innerHeight, 
                  width: 25,
                  position: 'absolute',
                  marginLeft: 110,
                  boxShadow: 'none',
                  borderRadius: 0
                }}><CardContent></CardContent></Card>
                <Card style={{
                  backgroundColor: '#2a333a', 
                  height: 0.8*window.innerHeight, 
                  width: 25,
                  position: 'absolute',
                  marginLeft: 145,
                  boxShadow: 'none',
                  borderRadius: 0
                }}><CardContent></CardContent></Card>
                <CardContent>
                  <Card style={{backgroundColor: '#f2c894', height: 0.76*window.innerHeight}}>
                    <CardContent>
                      
                      <Card style={{marginTop: 20, backgroundColor: '#2a333a', height: 80}}>
                          <CardHeader
                            title={
                              <Typography style={{color: "white", textAlign: "center", fontSize: 38}}>
                                Here are your future meetings:
                              </Typography>
                            }
                          />
                      </Card>
                      {
                        feed.map(e=>{return(
                          <div>
                            <Card style={{marginTop: 20, backgroundColor: '#d99152', height: 80}}>
                              <CardActionArea onClick={()=>alert(`/classes/${e.title}`)} disableRipple> 
                                <CardHeader
                                  title={
                                    <Typography style={{color: "black", textAlign: "center", fontSize: 38, backgroundColor: 'transparent'}}>
                                      {e.title} incepe la {timeConverter(e.start)}
                                    </Typography>
                                  }
                                />
                              </CardActionArea>
                            </Card>
                          </div>
                        )})
                      }
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card style={{backgroundColor: '#2a333a', height: 0.1*window.innerHeight, borderRadius: 0, boxShadow: 'none'}}>
                <CardContent>
                  <Typography style={{color: 'white', textAlign: 'right', fontSize: 20, fontWeight: 500, paddingTop: 40}}>
                    Uclass student account
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>:
        <>
          <Grid container spacing={0}>
            <Grid item xs={6}>
            </Grid>
              <CircularProgress style={{
                width: 500, 
                height: 500, 
                marginTop: 100, 
                color: '#D99152', 
                marginLeft: -250
              }} onMouseMove={getAll}/>
            <Grid item xs={6}>
            </Grid>
          </Grid>
            
        </>
      }

      

    </>
  )


}
