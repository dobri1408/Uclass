import React, {useState, useEffect, useRef} from 'react';
import {datas} from './Data';
import Navbar from '../../navbar'
import Grid from '@material-ui/core/Grid';
import Logo from '../../LOGO UCLASS ALB full.png'
import Card from '@material-ui/core/Card';
import MeetingImage from './meeting.png'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'; 
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import madeeasy from './madeeasy.svg';
import { makeStyles } from '@material-ui/core/styles';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { useHistory } from 'react-router-dom';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    backgroundColor: '#2A333A',
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%)',
    marginTop: 100,
    '&:hover': {
      backgroundColor: '#024873',
    }
  },
  link: {
    '&:hover': {
      color: '#2A333A'
    }
  },
  emoji: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));


function Home() {
 
  const classes = useStyles();
  const history = useHistory();
  const [current, setCurrent] = useState(0);

  return (
    <div>
    <Element name='slide1'>
      <Navbar/> 
      <img src={madeeasy} alt="not found :("  style={{transform:'scale(0.9)', position: 'absolute', marginLeft: 600, marginTop: -100 }}/>
      <Card style={{width: '100%', backgroundColor: '#345F65', boxShadow: 'none', borderRadius: 0, height: 900}} >
        <Grid container>
          <Grid item xs={4}>
          <img src={Logo} alt = 'Uclass' style={{diplay: 'block', marginLeft: 'auto', marginRight: 'auto', transform: 'scale(0.8)', marginTop: 150}}/>

            <Link to="slide2" smooth={true} duration={600} style={{color: 'white'}}>
              <Button color="inherit" className={classes.button}>
                <Typography style={{fontWeight: 600, fontSize: 30}}>
                  What is Uclass?
                </Typography>
              </Button>
            </Link>

          </Grid>
          <Grid item xs={8}>
          </Grid>
        </Grid>
      </Card>
    </Element>



    <Element name='slide2'>
    <Card style={{boxShadow: 'none', borderRadius: 0, backgroundColor: '#2A333A', height: 1000}}>
      <Link to="slide1" smooth={true} duration={700}>
      <IconButton 
        disableRipple
        onClick={()=>console.log('asd')}
        style={{
          position: "absolute",
          transform: "scale(2)",
          right: "3%",
          top: "5%",
          marginTop: 1000,
          backgroundColor: "transparent"
        }}
      >
        <ArrowUpwardIcon style={{color: 'white'}}/>
      </IconButton>
      </Link>
      <CardContent style={{height: 550,width:"100wh",marginRight:"0px"}}>
        <Container>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing="4"
          style={{marginRight:"0px"}}
          >
          <Grid item xs={6} >
            <Typography align='justify' style={{left:"10%",top: "130vh",color: 'white', fontSize: 26, fontWeigth: 600, wordWrap: "break-word", width: 600, position: 'absolute'}}>
              {datas[current].text}
            </Typography>
            <div style={{marginTop: 800}}>

            </div>
          </Grid>
          <Grid item xs={6}  style = {{marginTop:'20vh'}}>
            <img src={datas[current].img} alt="uclass.ro" style={{width: 900, transform: 'scale(1)'}}/>
            <div style={{marginTop: 800}}>
              
            </div>
          </Grid>
        </Grid>


        
        </Container>


        <Link to="slide3" smooth={true} duration={700}>
          <IconButton style={{backgroundColor: '#345F65', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', marginTop: 1400}}>
            <ArrowDownwardIcon style={{color: '#D99152'}}/>
          </IconButton>
        </Link>

      </CardContent>


      <CardActions>
          {
            datas.map((e,i)=>{return (
            <TimelineDot 
              // color={i === current ? "secondary" : "primary"} 
              // variant={i === current ? "default" : "outlined"} 
              variant={i !== current ? "default" : "outlined"}
              onClick={()=>setCurrent(prevCurrent => i)} 
              style={i === current ?
                {marginTop: 320, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#D99152', borderColor: '#D99152', transform:'scale(2)'}:
                {marginTop: 320, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#345F65', borderColor: '#F2C894', transform:'scale(2)'}
              }

            />)})
          }
        <div style={{marginTop: 320, marginLeft: 1200}}>
          <IconButton 
            onClick={()=>current > 0 ? setCurrent(prevCurrent => prevCurrent - 1) : null} 
            disabled={current === 0}
            style={{backgroundColor: '#345F65'}}
          >
            <ArrowBackIcon
              style={current === 0 ? {color: '#2A333A'}:{color: '#F2C894'}}
            />
          </IconButton>
          <IconButton 
            onClick={()=>current < datas.length-1 ? setCurrent(prevCurrent => prevCurrent + 1) : null} 
            disabled={current === datas.length-1}
            style={{backgroundColor: '#345F65', marginLeft: 50}}
          >
            <ArrowForwardIcon 
              style={current === datas.length-1 ? {color: '#2A333A'}:{color: '#F2C894'}}
            />
          </IconButton>
        </div>
      </CardActions>
    </Card>
    </Element>

    <Element name="slide3">
      <Link to="slide1" smooth={true} duration={700}>
        <IconButton 
          disableRipple
          onClick={()=>console.log('asd')}
          style={{
            position: "absolute",
            transform: "scale(2)",
            right: "3%",
            top: "5%",
            marginTop: 2000,
            backgroundColor: "transparent"
          }}
        >
        <ArrowUpwardIcon style={{color: 'black'}}/>
      </IconButton>
      </Link>
      <Card style={{height: 1000, boxShadow: 'none', borderRadius: 0, backgroundColor: '#F2F2F2'}}>
        <CardContent>
          <Typography style={{color: 'black', fontSize: 50, fontWeight: 600, textAlign: 'center'}}>
            Get started today!
          </Typography>

          <Grid container style={{marginTop: 50}}>
            <Grid item xs={5}>
              <Card style={{boxShadow: 'none', backgroundColor: '#345F65', height: 750}}>
                <CardContent style={{marginLeft: 30, marginRight: 30, backgroundColor: 'transparent'}}>
                  <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
                    Create an account
                  </Typography>
                  {/* <Button variant="contained" style={{backgroundColor: 'green', width: '100%'}}>
                    <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600}}>
                      Student account to enroll to a class
                    </Typography>
                  </Button>

                  <Button variant="contained" style={{backgroundColor: 'blue', width: '100%', marginTop: 100}}>
                    <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600}}>
                      Teacher to host a classroom on uclass
                    </Typography>
                  </Button> */}
                  <CardActionArea disableRipple style={{ backgroundColor: 'transparent' }} onClick={()=>history.push('/signelev')}>
                    <Typography style={{fontSize: 170, textAlign: 'center'}}>
                      👨‍🎓
                    </Typography>
                  </CardActionArea>
                  <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
                    STUDENT
                  </Typography>
                  <CardActionArea disableRipple className={classes.emoji} onClick={()=>history.push('/signprofesor')}>
                    <Typography style={{fontSize: 170, textAlign: 'center'}}>
                    🧑‍🏫
                    </Typography>
                  </CardActionArea>
                  <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
                    TEACHER
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={2}>
              <Typography style={{color: 'black', fontSize: 50, textAlign: 'center', fontWeight: 400, marginTop: 350}}>
                Or...
              </Typography>
            </Grid>
            <Grid item xs={5}>
                <Card style={{boxShadow: 'none', backgroundColor: '#345F65', height: 750}}>
                  <CardContent style={{marginLeft: 30, marginRight: 30}}>
                    <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
                      Request a custom query suited for your business
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      📧 Send us an email <span className={classes.link} onClick={()=>window.open('mailto:contact@uclass.ro')}>contact@uclass.ro</span>
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      ☎️ Call us at +40748115911 / +40774630690
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      📷 Message us on instagram <span className={classes.link} onClick={()=>window.open('https://www.instagram.com/uclass.ro')}>@uclass.ro</span>
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      ☁️ Find us on facebook <span className={classes.link} onClick={()=>window.open('https://www.facebook.com/uclass.ro')}>Uclass page</span>
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Element>








      {/* <Grid container style={{paddingTop: 500}}>
        <Grid item xs={1}>
        </Grid>
          <Grid item xs={10}>
            <Card style={{backgroundColor: '#345F65', boxShadow:"none"}}>
              <CardHeader
                title={
                  <Typography style={{color: 'white', fontSize: 50, fontWeigth: 600, textAlign: 'center'}}>
                    {data[current].title}
                  </Typography>
                }
                style={{backgroundColor: '#2A333A', height: 80}}
              />
              <CardContent style={{height: 550}}>
                <Container>
    
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="flex-start"
                  >
                  <Grid item xs={6} style={{}}>
                    <Typography align='justify' style={{color: 'white', fontSize: 30, fontWeigth: 600, wordWrap: "break-word", width: 450}}>
                      {data[current].text}
                    </Typography>
                    {
                      current === data.length-1 &&
                      <h1>ai ajuns la final</h1>
                    }
                  </Grid>
                  <Grid item xs={6} style={{}}>
                    <img src={data[current].img} alt="https://ceva.com" style={{width: 450, float: 'right'}}/>
                  </Grid>
                </Grid>
                </Container>
              </CardContent>
              <CardActions>

              {
                data.map((e,i)=>{return (
                <TimelineDot 
                  // color={i === current ? "secondary" : "primary"} 
                  // variant={i === current ? "default" : "outlined"} 
                  variant={i !== current ? "default" : "outlined"}
                  onClick={()=>setCurrent(prevCurrent => i)} 
                  style={i === current ?
                    {marginTop: 20, marginLeft: 15, marginRight: 10, boxShadow: 'none', backgroundColor: '#2A333A', borderColor: '#F2C894', transform:'scale(2)'}:
                    {marginTop: 20, marginLeft: 15, marginRight: 10, boxShadow: 'none', backgroundColor: '#F2C894', borderColor: '#2A333A', transform:'scale(2)'}
                  }

                />)})
              }
              <IconButton 
                style={{marginLeft: 'auto'}} 
                onClick={()=>current > 0 ? setCurrent(prevCurrent => prevCurrent - 1) : null} 
                disabled={current === 0}
              >
                <ArrowBackIcon
                  style={current === 0 ? {color: '#2A333A'}:{color: '#F2C894'}}
                />
              </IconButton>
              <IconButton 
                onClick={()=>current < data.length-1 ? setCurrent(prevCurrent => prevCurrent + 1) : null} 
                disabled={current === data.length-1}
              >
                <ArrowForwardIcon 
                  style={current === data.length-1 ? {color: '#2A333A'}:{color: '#F2C894'}}
                />
              </IconButton>
              </CardActions>
            </Card>
          </Grid>
        <Grid item xs={1}>
        </Grid>
      </Grid> */}

      {/* <Footer style={{marginTop: 10}}/> */}
    </div>
  
    
  );
}

export default Home;