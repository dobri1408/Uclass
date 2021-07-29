import React, {useState, useEffect, useRef} from 'react';
// import HeroSection from '../../HeroSection';
// import { homeObjOne,homeIntalnire,homeClasa,homeTest,homeDocument,homeTabla,homeVideo, data } from './Data';
import {datas } from './Data';
import Navbar from '../../navbar'
// import Footer from '../Footer/Footer';
// import './Home.scss'
// import AliceCarousel from 'react-alice-carousel';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'; 
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import { data } from '../../../store/data';
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
    marginTop: 300,
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

  // useEffect(()=>{
  //   setInterval(()=>{
  //     setCurrent(current+1);
  //   }, 1000)
  // })

  return (
    <div>
      <Navbar/> 
      {/* <AliceCarousel
              duration={4000}
              autoPlay={true}
              startIndex = {1}
              fadeOutAnimation={true}
              mouseDragEnabled={true}
              playButtonEnabled={true}
        
              autoPlayInterval={20000}
              autoPlayDirection="rtl"
              autoPlayActionDisabled={true}
        
      >
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeIntalnire} />
      <HeroSection {...homeClasa} />
      <HeroSection {...homeTest} />
      <HeroSection {...homeDocument} />
      <HeroSection {...homeTabla} />
      <HeroSection {...homeVideo} />
    </AliceCarousel> */}

    <img src={madeeasy} alt="not found :("  style={{transform:'scale(0.9)', position: 'absolute', marginLeft: 600, marginTop: -100 }}/>
    <Card style={{width: '100%', backgroundColor: '#345F65', boxShadow: 'none', borderRadius: 0, height: 900}} >
      <Grid container>
        <Grid item xs={4}>
          <Typography style={{color: 'white', fontSize: 100, fontWeight: 300, textAlign: 'center', marginTop: 200}}>
            Uclass
          </Typography>

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



    <Element name='slide2'>
    <Card style={{boxShadow: 'none', borderRadius: 0, backgroundColor: '#2A333A', height: 1000}}>
      <CardContent style={{height: 550}}>
        <Container>


        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
          >
          <Grid item xs={6} >
            <Typography align='justify' style={{color: 'white', fontSize: 30, fontWeigth: 600, wordWrap: "break-word", width: 600, position: 'absolute'}}>
              {datas[current].text}
            </Typography>
            <div style={{marginTop: 800}}>

            </div>
          </Grid>
          <Grid item xs={6} >
            <img src={datas[current].img} alt="https://ceva.com" style={{width: 600, float: 'right'}}/>
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
                {marginTop: 370, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#D99152', borderColor: '#D99152', transform:'scale(2)'}:
                {marginTop: 370, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#345F65', borderColor: '#F2C894', transform:'scale(2)'}
              }

            />)})
          }
        <div style={{marginTop: 350, marginLeft: 1200}}>
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
                      🏫
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
                      📧 You can send us an email <span className={classes.link} onClick={()=>window.open('mailto:contact@uclass.ro')}>contact@uclass.ro</span>
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      ☎️ You can call us (9 AM-18 PM) <span className={classes.link} onClick={()=>console.log('phone')}>+40774777777</span>
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      📷 You can message us on instagram <span className={classes.link} onClick={()=>window.open('https://www.instagram.com/uclass.ro')}>@uclass.ro</span>
                    </Typography>
                    <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
                      ☁️ You can find us on facebook <span className={classes.link} onClick={()=>window.open('mailto:contact@uclass.ro')}>Uclass page</span>
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