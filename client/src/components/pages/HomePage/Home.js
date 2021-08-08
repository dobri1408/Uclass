// import React, {useState, useEffect, useRef} from 'react';
// import {datas} from './Data';
// import Navbar from '../../navbar'
// import Grid from '@material-ui/core/Grid';
// import Logo from '../../LOGO UCLASS ALB full.png'
// import Card from '@material-ui/core/Card';
// import MeetingImage from './meeting.png'
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions'; 
// import CardHeader from '@material-ui/core/CardHeader';
// import CardActionArea from '@material-ui/core/CardActionArea';

// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import TimelineDot from '@material-ui/lab/TimelineDot';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';
// import madeeasy from './madeeasy.svg';
// import { makeStyles } from '@material-ui/core/styles';
// import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import { useHistory } from 'react-router-dom';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

// const useStyles = makeStyles((theme) => ({
//   button: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 10,
//     paddingBottom: 10,
//     borderRadius: 50,
//     backgroundColor: '#2A333A',
//     position: 'relative',
//     left: '50%',
//     transform: 'translate(-50%)',
//     marginTop: 100,
//     '&:hover': {
//       backgroundColor: '#024873',
//     }
//   },
//   link: {
//     '&:hover': {
//       color: '#2A333A'
//     }
//   },
//   emoji: {
//     backgroundColor: 'transparent',
//     '&:hover': {
//       backgroundColor: 'transparent'
//     }
//   }
// }));


// function Home() {
 
//   const classes = useStyles();
//   const history = useHistory();
//   const [current, setCurrent] = useState(0);

//   return (
//     <div>
//     <Element name='slide1'>
//       <Navbar color={"#2a333a"}/> 
//       <img src={madeeasy} alt="not found :("  style={{transform:'scale(0.9)', position: 'absolute', marginLeft: 600, marginTop: -100 }}/>
//       <Card style={{width: '100%', backgroundColor: '#345F65', boxShadow: 'none', borderRadius: 0, height: 900}} >
//         <Grid container>
//           <Grid item xs={4}>
//           <img src={Logo} alt = 'Uclass' style={{diplay: 'block', marginLeft: 'auto', marginRight: 'auto', transform: 'scale(0.8)', marginTop: 150}}/>
//             <Link to="slide2" smooth={true} duration={600} style={{color: 'white'}}>
//               <Button color="inherit" className={classes.button}>
//                 <Typography style={{fontWeight: 600, fontSize: 30}}>
//                   What is Uclass?
//                 </Typography>
//               </Button>
//             </Link>

//           </Grid>
//           <Grid item xs={8}>
//           </Grid>
//         </Grid>
//       </Card>
//     </Element>



//     <Element name='slide2'>





//     <Card style={{boxShadow: 'none', borderRadius: 0, backgroundColor: '#2A333A', height: 1000}}>
//       {/* <Link to="slide1" smooth={true} duration={700}>
//       <IconButton 
//         disableRipple
//         onClick={()=>console.log('asd')}
//         style={{
//           position: "absolute",
//           transform: "scale(2)",
//           right: "3%",
//           top: "5%",
//           marginTop: 1000,
//           backgroundColor: "transparent"
//         }}
//       >
//         <ArrowUpwardIcon style={{color: 'white'}}/>
//       </IconButton>
//       </Link> */}
//       <CardContent style={{height: 550,width:"100wh",marginRight:"0px"}}>
//         <Container>

//         <Grid
//           container
//           direction="row"
//           justify="center"
//           alignItems="center"
//           spacing="4"
//           style={{marginRight:"0px"}}
//           >
//           <Grid item xs={6} >
//             <Typography align='justify' style={{left:"10%",top: "130vh",color: 'white', fontSize: 26, fontWeigth: 600, wordWrap: "break-word", width: 600, position: 'absolute'}}>
//               {datas[current].text}
//             </Typography>
//             <div style={{marginTop: 800}}>

//             </div>
//           </Grid>
//           <Grid item xs={6}  style = {{marginTop:'20vh'}}>
//             <img src={datas[current].img} alt="uclass.ro" style={{width: 900, transform: 'scale(1.5)'}}/>
//             <div style={{marginTop: 800}}>
              
//             </div>
//           </Grid>
//         </Grid>


        
//         </Container>


//         <Link to="slide3" smooth={true} duration={700}>
//           <IconButton style={{backgroundColor: '#345F65', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', marginTop: 1400}}>
//             <ArrowDownwardIcon style={{color: '#D99152'}}/>
//           </IconButton>
//         </Link>

//       </CardContent>


//       <CardActions>
//           {
//             datas.map((e,i)=>{return (
//             <TimelineDot 
//               // color={i === current ? "secondary" : "primary"} 
//               // variant={i === current ? "default" : "outlined"} 
//               variant={i !== current ? "default" : "outlined"}
//               onClick={()=>setCurrent(prevCurrent => i)} 
//               style={i === current ?
//                 {marginTop: 320, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#D99152', borderColor: '#D99152', transform:'scale(2)'}:
//                 {marginTop: 320, marginLeft: 50, marginRight: 10, boxShadow: 'none', backgroundColor: '#345F65', borderColor: '#F2C894', transform:'scale(2)'}
//               }

//             />)})
//           }
//         <div style={{marginTop: 320, marginLeft: 1200}}>
//           <IconButton 
//             onClick={()=>current > 0 ? setCurrent(prevCurrent => prevCurrent - 1) : null} 
//             disabled={current === 0}
//             style={{backgroundColor: '#345F65'}}
//           >
//             <ArrowBackIcon
//               style={current === 0 ? {color: '#2A333A'}:{color: '#F2C894'}}
//             />
//           </IconButton>
//           <IconButton 
//             onClick={()=>current < datas.length-1 ? setCurrent(prevCurrent => prevCurrent + 1) : null} 
//             disabled={current === datas.length-1}
//             style={{backgroundColor: '#345F65', marginLeft: 50}}
//           >
//             <ArrowForwardIcon 
//               style={current === datas.length-1 ? {color: '#2A333A'}:{color: '#F2C894'}}
//             />
//           </IconButton>
//         </div>
//       </CardActions>
//     </Card>






//     </Element>

//     <Element name="slide3">
//       <Link to="slide1" smooth={true} duration={700}>
//         <IconButton 
//           disableRipple
//           onClick={()=>console.log('asd')}
//           style={{
//             position: "absolute",
//             transform: "scale(2)",
//             right: "3%",
//             top: "5%",
//             marginTop: 2000,
//             backgroundColor: "transparent"
//           }}
//         >
//         <ArrowUpwardIcon style={{color: 'black'}}/>
//       </IconButton>
//       </Link>
//       <Card style={{height: 1000, boxShadow: 'none', borderRadius: 0, backgroundColor: '#F2F2F2'}}>
//         <CardContent>
//           <Typography style={{color: 'black', fontSize: 50, fontWeight: 600, textAlign: 'center'}}>
//             Get started today!
//           </Typography>

//           <Grid container style={{marginTop: 50}}>
//             <Grid item xs={5}>
//               <Card style={{boxShadow: 'none', backgroundColor: '#345F65', height: 750}}>
//                 <CardContent style={{marginLeft: 30, marginRight: 30, backgroundColor: 'transparent'}}>
//                   <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
//                     Create an account
//                   </Typography>
//                   {/* <Button variant="contained" style={{backgroundColor: 'green', width: '100%'}}>
//                     <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600}}>
//                       Student account to enroll to a class
//                     </Typography>
//                   </Button>

//                   <Button variant="contained" style={{backgroundColor: 'blue', width: '100%', marginTop: 100}}>
//                     <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600}}>
//                       Teacher to host a classroom on uclass
//                     </Typography>
//                   </Button> */}
//                   <CardActionArea disableRipple style={{ backgroundColor: 'transparent' }} onClick={()=>history.push('/signelev')}>
//                     <Typography style={{fontSize: 170, textAlign: 'center'}}>
//                       👨‍🎓
//                     </Typography>
//                   </CardActionArea>
//                   <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
//                     STUDENT
//                   </Typography>
//                   <CardActionArea disableRipple className={classes.emoji} onClick={()=>history.push('/signprofesor')}>
//                     <Typography style={{fontSize: 170, textAlign: 'center'}}>
//                     🧑‍🏫
//                     </Typography>
//                   </CardActionArea>
//                   <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
//                     TEACHER
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//             <Grid item xs={2}>
//               <Typography style={{color: 'black', fontSize: 50, textAlign: 'center', fontWeight: 400, marginTop: 350}}>
//                 Or...
//               </Typography>
//             </Grid>
//             <Grid item xs={5}>
//                 <Card style={{boxShadow: 'none', backgroundColor: '#345F65', height: 750}}>
//                   <CardContent style={{marginLeft: 30, marginRight: 30}}>
//                     <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
//                       Request a custom query suited for your business
//                     </Typography>
//                     <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//                       📧 Send us an email <span className={classes.link} onClick={()=>window.open('mailto:contact@uclass.ro')}>contact@uclass.ro</span>
//                     </Typography>
//                     <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//                       ☎️ Call us at +40748115911 / +40774630690
//                     </Typography>
//                     <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//                       📷 Message us on instagram <span className={classes.link} onClick={()=>window.open('https://www.instagram.com/uclass.ro')}>@uclass.ro</span>
//                     </Typography>
//                     <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//                       ☁️ Find us on facebook <span className={classes.link} onClick={()=>window.open('https://www.facebook.com/uclass.ro')}>Uclass page</span>
//                     </Typography>
//                   </CardContent>
//                 </Card>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Element>








//       {/* <Grid container style={{paddingTop: 500}}>
//         <Grid item xs={1}>
//         </Grid>
//           <Grid item xs={10}>
//             <Card style={{backgroundColor: '#345F65', boxShadow:"none"}}>
//               <CardHeader
//                 title={
//                   <Typography style={{color: 'white', fontSize: 50, fontWeigth: 600, textAlign: 'center'}}>
//                     {data[current].title}
//                   </Typography>
//                 }
//                 style={{backgroundColor: '#2A333A', height: 80}}
//               />
//               <CardContent style={{height: 550}}>
//                 <Container>
    
//                 <Grid
//                   container
//                   direction="row"
//                   justify="space-evenly"
//                   alignItems="flex-start"
//                   >
//                   <Grid item xs={6} style={{}}>
//                     <Typography align='justify' style={{color: 'white', fontSize: 30, fontWeigth: 600, wordWrap: "break-word", width: 450}}>
//                       {data[current].text}
//                     </Typography>
//                     {
//                       current === data.length-1 &&
//                       <h1>ai ajuns la final</h1>
//                     }
//                   </Grid>
//                   <Grid item xs={6} style={{}}>
//                     <img src={data[current].img} alt="https://ceva.com" style={{width: 450, float: 'right'}}/>
//                   </Grid>
//                 </Grid>
//                 </Container>
//               </CardContent>
//               <CardActions>

//               {
//                 data.map((e,i)=>{return (
//                 <TimelineDot 
//                   // color={i === current ? "secondary" : "primary"} 
//                   // variant={i === current ? "default" : "outlined"} 
//                   variant={i !== current ? "default" : "outlined"}
//                   onClick={()=>setCurrent(prevCurrent => i)} 
//                   style={i === current ?
//                     {marginTop: 20, marginLeft: 15, marginRight: 10, boxShadow: 'none', backgroundColor: '#2A333A', borderColor: '#F2C894', transform:'scale(2)'}:
//                     {marginTop: 20, marginLeft: 15, marginRight: 10, boxShadow: 'none', backgroundColor: '#F2C894', borderColor: '#2A333A', transform:'scale(2)'}
//                   }

//                 />)})
//               }
//               <IconButton 
//                 style={{marginLeft: 'auto'}} 
//                 onClick={()=>current > 0 ? setCurrent(prevCurrent => prevCurrent - 1) : null} 
//                 disabled={current === 0}
//               >
//                 <ArrowBackIcon
//                   style={current === 0 ? {color: '#2A333A'}:{color: '#F2C894'}}
//                 />
//               </IconButton>
//               <IconButton 
//                 onClick={()=>current < data.length-1 ? setCurrent(prevCurrent => prevCurrent + 1) : null} 
//                 disabled={current === data.length-1}
//               >
//                 <ArrowForwardIcon 
//                   style={current === data.length-1 ? {color: '#2A333A'}:{color: '#F2C894'}}
//                 />
//               </IconButton>
//               </CardActions>
//             </Card>
//           </Grid>
//         <Grid item xs={1}>
//         </Grid>
//       </Grid> */}

//       {/* <Footer style={{marginTop: 10}}/> */}
//     </div>
  
    
//   );
// }

// export default Home;











// import * as THREE from 'three'
// import React, { useRef, useMemo, useState } from 'react'
// import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
// import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import Navbar from '../../navbar';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import { useHistory } from 'react-router-dom'
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import IconButton from '@material-ui/core/IconButton';
// import clsx from "clsx";
// import Logo from '../../LOGO UCLASS ALB full.png'
// import madeeasy from './madeeasy.svg';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import Container from '@material-ui/core/Container';
// import { datas } from './Data'
// import TimelineDot from '@material-ui/lab/TimelineDot'
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// import CardActions from '@material-ui/core/CardActions';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//     color: '#FFFFFF',
//     fontSize: 30,
//     fontWeight: 400,
//   },
//   button: {
//     paddingLeft: 20,
//     paddingRight: 20,
//     paddingTop: 10,
//     paddingBottom: 10,
//     borderRadius: 0,
//     backgroundColor: 'black',
//     // marginRight: 10,
//     // marginLeft: 10,
//     border: '7px solid #d99152',
//     marginBottom: 0,
//     marginTop: 100,
//     marginLeft: 400,
//     // width: 500,
//     '&:hover': {
//       backgroundColor: '#d99152',
//       border: '7px solid white',
//     }
//   },
//   typo: {
//     fontWeight: 600,
//     fontSize: 30,
//     color: 'white',
//     '&:hover': {
//       color: 'black'
//     }
//   },
//   icon: {
//     backgroundColor: '#345F65',
//     '&:hover': {
//       backgroundColor: '#2A333A',
//     }
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest
//     })
//   },
//   expandOpen: {
//     transform: "rotate(360deg)"
//   }
// }));


// extend({ EffectComposer, ShaderPass, RenderPass, AfterimagePass, UnrealBloomPass })

// function Swarm({ count }) {
//   const mesh = useRef()
//   const light = useRef()
//   const { viewport, mouse } = useThree()

//   const dummy = useMemo(() => new THREE.Object3D(), [])
//   const particles = useMemo(() => {
//     const temp = []
//     for (let i = 0; i < count; i++) {
//       const t = Math.random() * 100
//       const factor = 20 + Math.random() * 100
//       const speed = (0.01 + Math.random() / 200)/3
//       const xFactor = -50 + Math.random() * 100
//       const yFactor = -50 + Math.random() * 100
//       const zFactor = -50 + Math.random() * 100
//       temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
//     }
//     return temp
//   }, [count])

//   useFrame((state) => {
//     particles.forEach((particle, i) => {
//       let { t, factor, speed, xFactor, yFactor, zFactor } = particle
//       t = particle.t += speed / 2
//       const a = Math.cos(t) + Math.sin(t * 1) / 10
//       const b = Math.sin(t) + Math.cos(t * 2) / 10
//       const s = Math.cos(t)
//       particle.mx += mouse.x * viewport.width * particle.mx * 0.01
//       particle.my += mouse.y * viewport.height * particle.my * 0.01
//       dummy.position.set(
//         (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
//         (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
//         (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
//       )
//       dummy.scale.set(s, s, s)
//       dummy.rotation.set(s * 5, s * 5, s * 5)
//       dummy.updateMatrix()
//       mesh.current.setMatrixAt(i, dummy.matrix)
//     })
//     mesh.current.instanceMatrix.needsUpdate = true
//   })
//   return (
//     <>
//       <pointLight ref={light} distance={100} intensity={0.8} color="#ff2626" />
//       <instancedMesh ref={mesh} args={[null, null, count]}>
//         <tetrahedronBufferGeometry args={[1, 0]} />
//         <meshStandardMaterial color="white" />
//       </instancedMesh>
//     </>
//   )
// }

// function Dolly() {
//   useFrame(({ clock, camera }) => {
//     camera.position.z = 50 - Math.sin(clock.getElapsedTime()*0.3) * 30 * Math.sin(clock.getElapsedTime()*0.3)
//   })
//   return null
// }

// const Home = () => {
//   const classes = useStyles();
//   const history = useHistory();
//   const [current, setCurrent] = useState(0);
//   const [components, setComponents] = useState([
//     <Grid container>
//       <Grid item xs={6}>
//         {/* <Typography style={{
//           color: 'black', 
//           fontSize: 200, 
//           fontWeight: 600,
//           fontFamily: 'Roboto',
//           marginLeft: 50,
//           marginTop: 350,
//           WebkitTextStroke: '5px #d99152',
//           }}>
//           UCLAS1
//         </Typography> */}
//         <img src={Logo} alt = 'Uclass' style={{
//           diplay: 'block', 
//           marginLeft: 'auto', 
//           marginRight: 'auto', 
//           transform: 'scale(0.8)', 
//           marginTop: 100
//         }}/>
//       </Grid>
//       <Grid item xs={6}>
//         <img src={madeeasy} alt='Uclass' style={{color: 'white'}} />
//       </Grid>
//     </Grid>,
//     0,
//       <Grid container style={{marginBottom: 500}}>
//       <Grid item xs={6}>
//       <Card style={{
//         boxShadow: 'none', 
//         backgroundColor: '#345F65', 
//         height: 750,
//         margin: 50
//       }}>
//         <CardContent style={{marginLeft: 30, marginRight: 30, backgroundColor: 'transparent'}}>
//           <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
//             Create an account
//           </Typography>
//           <CardActionArea disableRipple style={{ backgroundColor: 'transparent' }} onClick={()=>history.push('/signelev')}>
//             <Typography style={{fontSize: 170, textAlign: 'center'}}>
//               👨‍🎓
//             </Typography>
//           </CardActionArea>
//           <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
//             STUDENT
//           </Typography>
//           <CardActionArea disableRipple className={classes.emoji} onClick={()=>history.push('/signprofesor')}>
//             <Typography style={{fontSize: 170, textAlign: 'center'}}>
//             🧑‍🏫
//             </Typography>
//           </CardActionArea>
//           <Typography style={{fontSize: 20, color: 'white', textAlign: 'center'}}>
//             TEACHER
//           </Typography>
//         </CardContent>
//       </Card>
//       </Grid>
//       <Grid item xs={6}>
//         <Card style={{
//           boxShadow: 'none', 
//           backgroundColor: '#345F65', 
//           height: 750,
//           margin: 50
//         }}>
//           <CardContent style={{marginLeft: 30, marginRight: 30}}>
//             <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
//               Request a custom query suited for your business
//             </Typography>
//             <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//               📧 Send us an email <span className={classes.link} onClick={()=>window.open('mailto:contact@uclass.ro')}>contact@uclass.ro</span>
//             </Typography>
//             <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//               ☎️ Call us at +40748115911 / +40774630690
//             </Typography>
//             <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//               📷 Message us on instagram <span className={classes.link} onClick={()=>window.open('https://www.instagram.com/uclass.ro')}>@uclass.ro</span>
//             </Typography>
//             <Typography style={{color: 'white', fontSize: 30, fontWeight: 600, paddingTop: 50}}>
//               ☁️ Find us on facebook <span className={classes.link} onClick={()=>window.open('https://www.facebook.com/uclass.ro')}>Uclass page</span>
//             </Typography>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   ]);
//   const [element, setElement] = useState(components[0]);
//   const [expanded, setExpanded] = useState(false);
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//     setComponents(prevComponents => [prevComponents[1],prevComponents[2],prevComponents[0]])
//     setElement(components[0]);
//   };



//   return (
//     <>
//     <div style={{
//       position: 'fixed', 
//       top: 0, 
//       right: 0, 
//       bottom:  0, 
//       left: 0,
//       backgroundColor: 'black'
//     }}>
//       <div style={{
//         position: 'fixed', 
//         backgroundColor: 'transparent', 
//         zIndex: 100,
//         width: window.screen.width,
//         height: 3*window.screen.height,
//       }}>
//         <Navbar color={'transparent'}/>
          
                
//           {
//             components.filter((e,i)=>i===0).map(e=>{return(
//               <div>
//                 {
//                   e!==0 &&
//                   {e}
//                 }
//               </div>
//             )})
//           }
        
//           {
//             components[0] === 0 &&
//               <div>
//                 <div>
//                     <Card style={{
//                       backgroundColor: 'transparent', 
//                       boxShadow: 'none',
//                       position: 'absolute',
//                       left: 50,
//                       top: window.screen.height-150
//                     }}>
                      
//                       <CardActions>
//                         {
//                             datas.map((e,i)=>{return (
//                             <TimelineDot 
//                               variant={i !== current ? "default" : "outlined"}
//                               onClick={()=>setCurrent(prevCurrent => i)} 
//                               style={i === current ?
//                                 {marginRight: 20, marginLeft: 20, boxShadow: 'none', backgroundColor: '#D99152', borderColor: '#D99152', transform:'scale(2)'}:
//                                 {marginRight: 20, marginLeft: 20, boxShadow: 'none', backgroundColor: '#345F65', borderColor: '#F2C894', transform:'scale(2)'}
//                               }

//                             />)})
//                           }
//                       </CardActions>
//                     </Card>
//                     <div style={{
//                       position: 'absolute',
//                       right: 50,
//                       top: window.screen.height-150
//                     }}>
//                       <IconButton 
//                         onClick={()=>current > 0 ? setCurrent(prevCurrent => prevCurrent - 1) : null} 
//                         disabled={current === 0}
//                         style={{backgroundColor: '#345F65'}}
//                       >
//                         <ArrowBackIcon
//                           style={current === 0 ? {color: '#2A333A'}:{color: '#F2C894'}}
//                         />
//                       </IconButton>
//                       <IconButton 
//                         onClick={()=>current < datas.length-1 ? setCurrent(prevCurrent => prevCurrent + 1) : null} 
//                         disabled={current === datas.length-1}
//                         style={{backgroundColor: '#345F65', marginLeft: 50}}
//                       >
//                         <ArrowForwardIcon 
//                           style={current === datas.length-1 ? {color: '#2A333A'}:{color: '#F2C894'}}
//                         />
//                       </IconButton>
//                     </div>
//                 </div>
//               <Grid container>
//               <Grid item xs={6}>
//                 <Typography align='justify' style={{
//                   color: 'white',
//                   fontSize: 40,
//                   fontWeigth: 600,
//                   margin: 75
//                 }}>
//                   {datas[current].text}
//                 </Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <img src={datas[current].img} alt="uclass.ro" style={{
//                   transform: 'scale(0.8)',
//                   marginTop: 50
//                 }}/>
//               </Grid>
//               </Grid>
//               </div>
//           }

//           <IconButton
//             className={clsx(classes.expand, {
//               [classes.expandOpen]: expanded
//             })}
//             disableRipple
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             style={{
//               // display: 'block',
//               // marginLeft: 'auto',
//               // marginRight: 'auto',
//               // backgroundColor: 'transparent',
//               position: 'fixed', 
//               bottom: 50, 
//               right: window.screen.width/2,
//               left: window.screen.width/2
//             }}
//           >
//             <ArrowForwardIcon style={{color: 'white', transform: 'scale(3.5)'}}/>
//         </IconButton>
//       </div>
//           <Canvas camera={{ fov: 75, position: [0, 0, 70], zoom: 2 }}>
//           <spotLight position={[100,-100,100]} angle={1} color="#345f65"/>
//           <spotLight position={[-50,200,-100]} angle={1} color="#024873"/>
//           <spotLight position={[50,-100, 50]} angle={1} color="#345f65"/>
//           <spotLight position={[-110,-200, 200]} angle={1} color="#024873"/>
//           <Swarm count={1000} />
//           <Dolly />
//           </Canvas>
//     </div>
//     </>
//   )
// }

// export default Home;




import * as THREE from 'three'
import React, { useRef, useMemo, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import Navbar from '../../navbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import clsx from "clsx";
import Logo from '../../LOGO UCLASS ALB full.png'
import madeeasy from './madeeasy.svg';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Container from '@material-ui/core/Container';
import { datas } from './Data'
import TimelineDot from '@material-ui/lab/TimelineDot'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CardActions from '@material-ui/core/CardActions';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 400,
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 0,
    backgroundColor: 'black',
    // marginRight: 10,
    // marginLeft: 10,
    border: '7px solid #d99152',
    marginBottom: 0,
    marginTop: 100,
    marginLeft: 400,
    // width: 500,
    '&:hover': {
      backgroundColor: '#d99152',
      border: '7px solid white',
    }
  },
  typo: {
    fontWeight: 600,
    fontSize: 30,
    color: 'white',
    '&:hover': {
      color: 'black'
    }
  },
  icon: {
    backgroundColor: '#345F65',
    '&:hover': {
      backgroundColor: '#2A333A',
    }
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(360deg)"
  }
}));


extend({ EffectComposer, ShaderPass, RenderPass, AfterimagePass, UnrealBloomPass })

function Swarm({ count }) {
  const mesh = useRef()
  const light = useRef()
  const { viewport, mouse } = useThree()

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = (0.01 + Math.random() / 200)/3
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      particle.mx += mouse.x * viewport.width * particle.mx * 0.01
      particle.my += mouse.y * viewport.height * particle.my * 0.01
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <>
      <pointLight ref={light} distance={100} intensity={0.8} color="#ff2626" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <tetrahedronBufferGeometry args={[1, 0]} />
        <meshStandardMaterial color="white" />
      </instancedMesh>
    </>
  )
}

function Dolly() {
  useFrame(({ clock, camera }) => {
    camera.position.z = 50 - Math.sin(clock.getElapsedTime()*0.3) * 30 * Math.sin(clock.getElapsedTime()*0.3)
  })
  return null
}

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const [components, setComponents] = useState([
    <Grid container>
      <Grid item xs={6}>
        {/* <Typography style={{
          color: 'black', 
          fontSize: 200, 
          fontWeight: 600,
          fontFamily: 'Roboto',
          marginLeft: 50,
          marginTop: 350,
          WebkitTextStroke: '5px #d99152',
          }}>
          UCLAS1
        </Typography> */}
        <img src={Logo} alt = 'Uclass' style={{
          diplay: 'block', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          transform: 'scale(0.8)', 
          marginTop: 100
        }}/>
      </Grid>
      <Grid item xs={6}>
        <img src={madeeasy} alt='Uclass' style={{color: 'white'}} />
      </Grid>
    </Grid>,
    0,
      <Grid container style={{marginBottom: 500}}>
      <Grid item xs={6}>
      <Card style={{
        boxShadow: 'none', 
        backgroundColor: '#345F65', 
        height: 750,
        margin: 50
      }}>
        <CardContent style={{marginLeft: 30, marginRight: 30, backgroundColor: 'transparent'}}>
          <Typography style={{color: 'white', textAlign: 'center', fontSize: 50, fontWeight: 600, marginBottom: 50}}>
            Create an account
          </Typography>
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
      <Grid item xs={6}>
        <Card style={{
          boxShadow: 'none', 
          backgroundColor: '#345F65', 
          height: 750,
          margin: 50
        }}>
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
  ]);
  const [element, setElement] = useState(components[0]);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    setComponents(prevComponents => [prevComponents[1],prevComponents[2],prevComponents[0]])
    setElement(components[0]);
  };



  return (
    <>
    <div style={{
      position: 'fixed', 
      top: 0, 
      right: 0, 
      bottom:  0, 
      left: 0,
      backgroundColor: 'black'
    }}>
      <div style={{
        position: 'fixed', 
        backgroundColor: 'transparent', 
        zIndex: 100,
        width: window.screen.width,
        height: 3*window.screen.height,
      }}>
        <Navbar color={'transparent'}/>
                
          {
            components.filter((e,i)=>i===0).map(e=>{return(
              <div>
                {
                  e!==0 &&
                  e
                }
              </div>
            )})
          }
        
        {
            components[0] === 0 &&
              <div>
                <div>
                    <Card style={{
                      backgroundColor: 'transparent', 
                      boxShadow: 'none',
                      position: 'absolute',
                      left: 50,
                      top: window.screen.height-200
                    }}>
                      
                      <CardActions>
                        {
                            datas.map((e,i)=>{return (
                            <TimelineDot 
                              variant={i !== current ? "default" : "outlined"}
                              onClick={()=>setCurrent(prevCurrent => i)} 
                              style={i === current ?
                                {marginRight: 20, marginLeft: 20, boxShadow: 'none', backgroundColor: '#D99152', borderColor: '#D99152', transform:'scale(2)'}:
                                {marginRight: 20, marginLeft: 20, boxShadow: 'none', backgroundColor: '#345F65', borderColor: '#F2C894', transform:'scale(2)'}
                              }

                            />)})
                          }
                      </CardActions>
                    </Card>
                    <div style={{
                      position: 'absolute',
                      right: 50,
                      top: window.screen.height-230
                    }}>
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
                </div>
              <Grid container>
              <Grid item xs={6}>
                <Typography align='justify' style={{
                  color: 'white',
                  fontSize: 40,
                  fontWeigth: 600,
                  margin: 75
                }}>
                  {datas[current].text}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <img src={datas[current].img} alt="uclass.ro" style={{
                  transform: 'scale(0.8)',
                  marginTop: 50
                }}/>
              </Grid>
              </Grid>
              </div>
          }

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            disableRipple
            onClick={handleExpandClick}
            aria-expanded={expanded}
            style={{
              // display: 'block',
              // marginLeft: 'auto',
              // marginRight: 'auto',
              // backgroundColor: 'transparent',
              position: 'fixed', 
              bottom: 50, 
              right: window.screen.width/2,
              left: window.screen.width/2
            }}
          >
            <ArrowForwardIcon style={{color: 'white', transform: 'scale(3.5)'}}/>
        </IconButton>
      </div>
          <Canvas camera={{ fov: 75, position: [0, 0, 70], zoom: 2 }}>
          <spotLight position={[100,-100,100]} angle={1} color="#345f65"/>
          <spotLight position={[-50,200,-100]} angle={1} color="#024873"/>
          <spotLight position={[50,-100, 50]} angle={1} color="#345f65"/>
          <spotLight position={[-110,-200, 200]} angle={1} color="#024873"/>
          <Swarm count={1000} />
          <Dolly />
          </Canvas>
    </div>
    </>
  )
}

export default Home;
