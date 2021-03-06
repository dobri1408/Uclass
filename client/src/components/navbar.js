import React from 'react';
import './navbar.css';
import {useHistory } from "react-router-dom"
import '../components/Login.scss';
import Image5 from "./LOGO UCLASS ALB full.png";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Login2 from './Login2';
import Login2Student from './Student/Login2Student';


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
    postion: 'fixed',
    // paddingLeft: 20,
    // paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 0,
    backgroundColor: 'black',
    marginRight: '1%',
    marginLeft: '1%',
    marginTop: 25,
    border: '7px solid #d99152',
    width: '18%',
    // '&:hover': {
    //   backgroundColor: '#d99152',
    //   border: '7px solid white',
    //   width: '100%',
    //   marginRight: 0,
    //   marginLeft: 0,
    //   position: 'fixed',
    //   left: 0,
    //   top: 0,
    //   zIndex: '200',
    //   // width: 100,
    //   // zIndex: 100
    // }
  },
  typo: {
    fontWeight: 600,
    fontSize: 25,
    color: 'white',
    // '&:hover': {
    //   color: 'black'
    // }
  },
  icon: {
    backgroundColor: '#345F65',
    '&:hover': {
      backgroundColor: '#2A333A',
    }
  }
}));

export default function Navbar(props) {
const classes = useStyles();
const history = useHistory();
return(
  <>
      <div className={classes.root}>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/')}>
                <Typography className={classes.typo}>
                  HOME
                </Typography>
              </Button>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/')}>
                <Typography className={classes.typo}>
                  UCLASS BUSINESS
                </Typography>
              </Button>
              {/* <Button color="inherit" className={classes.button} onClick={()=>history.push('/')}>
                <Typography className={classes.typo}>
                  LOGIN AS TEACHER
                </Typography>
              </Button>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/')}>
                <Typography className={classes.typo}>
                  LOGIN AS STUDENT
                </Typography>
              </Button> */}
              <Login2/>
              <Login2Student/>
              <Button color="inherit" className={classes.button} onClick={()=>history.push('/ask')}>
                <Typography className={classes.typo}>
                  REGISTER
                </Typography>
              </Button>
          {/* <AppBar position="static" style={{backgroundColor: props.color, boxShadow: 'none'}}>
            <Toolbar style={{marginBottom: 10, marginTop: 10}}>
              <IconButton edge="start" disableRipple style={{ backgroundColor: 'transparent' }} className={classes.menuButton} color="inherit" aria-label="menu">
                <img src={Image5}  alt="" style={{width: 100}}/>
              </IconButton>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                

 

            </Toolbar>
          </AppBar> */}
        </div>
    </>
  )
}
















  //   const [click, setClick] = useState(false);
  //   const [button, setButton] = useState(true);
  //   const handleClick = () => setClick(!click);
  //   const closeMobileMenu = () => setClick(false);
  //   const emailRef = useRef()
  //   const passwordRef = useRef()
  //   const [error, setError] = useState("")
  //   const [loading, setLoading] = useState(false)
  //   const history = useHistory()
  //   const { login } = useAuth()
  //   const [modalIsOpen,setIsOpen] = React.useState(false);
//   function openModal() {
  //     setIsOpen(true);
  //     console.log(error, loading)
  //   }
  
  //   function afterOpenModal() {
    
    //   }
    
    //   function closeModal(){
      //     setIsOpen(false);
      //   }
      
      //   async function handleSubmit(e) {
        //     e.preventDefault()
        
        //     try {
          //       setError("")
          //       setLoading(true)
          //       await login(emailRef.current.value, passwordRef.current.value)
          //       history.push("/profile")
          //     } catch {
            //       setError("Nu am putut sa te conectam, mai incearca o data")
            //     }
            
            //     setLoading(false)
            //   }
            
            //   const showButton = () => {
              //     if (window.innerWidth <= 960) {
                //       setButton(false);
                //     } else {
                  //       setButton(true);
                  //     }
                  //   };
                  
                  //   useEffect(() => {
                    //     showButton();
                    // },[]);
                    // window.addEventListener('resize',showButton);
                    //   return (
                      //     <>
                      //         <nav className='navbar'>
                      //           <div className='navbar-container container'>
                      //               <ul className='nav-item'>
                      //              <img src={Image5} className='pula' alt=""/>
                      //               </ul>
                      //             <div className='menu-icon' onClick={handleClick}>
                      //               {click ? <FaTimes /> : <FaBars />}
                      //             </div>
                      //             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                      
                      //               <li className='nav-item'>
                      //                 <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      //                   Acasa
                      //                 </Link>
                      //               </li>
                      //               <li className='nav-item'>
                      //                 <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                      //                   Uclass Business
                      //                 </Link>
                      //               </li>
                      
            
                      //               <li className='nav-btn'>
                      
                      //               <div>
                      //         <button onClick={openModal}>Autentfica-te</button>
                      //         <Modal
                      //           isOpen={modalIsOpen}
                      //           onAfterOpen={afterOpenModal}
                      //           onRequestClose={closeModal}
                      //           style={customStyles}
                      //           contentLabel="Example Modal"
                      //         >
                      
                      // <div className="loglog">
                      //       <div class="card">
                      //         <div class="card--header">
                      //           <p class="title">Autentfica-te</p>
//         </div>
//         <div class="card--body">
//           <label>Email Adress</label>
//           <input type="text" ref={emailRef} required />
//           <label>Password</label>
//           <input type="password" ref={passwordRef} required />
//         </div>
//       <div class="card--footer">
//         <button type="submit" id="signup" class="btn_sign-up" onClick={handleSubmit}>login</button>
//       </div>
//     </div>
//     </div>
//         </Modal>

//       </div>  
//               </li>
//               <li className='nav-btn'>
//               <Link
//                   to='/ask'
//                   className='nav-links'
//                   onClick={closeMobileMenu}

//           >
//               <button>Inregistreaza-te</button>
//       </Link>
//               </li>
//             </ul>
//           </div>
//         </nav>
//     </>
//   );