// import React, { useRef, useState } from "react"
// // import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "./contexts/AuthContext"
// import { Link, useHistory } from "react-router-dom";
// // import {storage} from './firebase/firebase';

// export default function UpdateProfile() {
//  var name = localStorage.getItem('name');
//  var school = localStorage.getItem('scoala');
//  var citat = localStorage.getItem('citat');
// //  var telefon = localStorage.getItem('telefon');

//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()
//   const numeRef = useRef();
//   const scoalaRef = useRef();
//   const { currentUser, updatePassword, updateEmail } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const history = useHistory()
//   // const allImputs = {imgUrl: ''}
 
//   function handleSubmit(e) {
//     e.preventDefault()
//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Parolele nu se potrivesc")
//     }

//     const promises = []
//     setLoading(true)
//     setError("")

//     if (emailRef.current.value !== currentUser.email) {
//       promises.push(updateEmail(emailRef.current.value))
//     }
//     if (passwordRef.current.value) {
//       promises.push(updatePassword(passwordRef.current.value))
//     }

//     Promise.all(promises)
//       .then(() => {
//         history.push("/")
//       })
//       .catch(() => {
//         setError("Failed to update account")
//       })
//       .finally(() => {
//         setLoading(false)
//       })
//   }

//   return (
//     <>
//     {console.log(school)}

//         <Card>
//         <Card.Body>
         
//           <h2 className="text-center mb-4">Update Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
        
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 ref={emailRef}
//                 required
//                 defaultValue={currentUser.email}
//               />
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Label>Nume</Form.Label>
//               <Form.Control
//                 type="name"
//                 ref={numeRef}
//                 required
//                 defaultValue={name}
//               />
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Label>Scoala</Form.Label>
//               <Form.Control
//                 type="school"
//                 ref={scoalaRef}
//                 required
//                 defaultValue={school}
//               />
//             </Form.Group>
//             <Form.Group id="email">
//               <Form.Label>Citat</Form.Label>
//               <Form.Control
//                 type="school"
//                 ref={scoalaRef}
//                 required
//                 defaultValue={citat}
//               />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Parola</Form.Label>
//               <Form.Control
//                 type="password"
//                 ref={passwordRef}
//                 placeholder="Daca vrei sa ai acceasi parola nu completa nimic aici"
//               />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Repeta Noua Parola</Form.Label>
//               <Form.Control
//                 type="password"
//                 ref={passwordConfirmRef}
//                 placeholder="Daca vrei sa ai acceasi parola nu completa nimic aici"
//               />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Actualizeaza
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         <Link to="/profile">Anuleaza</Link>
//       </div>
//     </>
//   )
// }

import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Grow from "@material-ui/core/Grow";
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    button: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 50,
        backgroundColor: '#2a333a',
        width: '100%',
        marginTop: 60,
        marginBottom: 10,
        '&:hover': {
          backgroundColor: '#f2c894',
        }
      },
  }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateProfile() {
    const classes = useStyles();
    const [open, setOpen]= useState(false);
    const [showEmail, setShowEmail] = useState(false);
    const [showFirstName, setShowFirstName] = useState(false);
    const [showLastName, setShowLastName] = useState(false);
    const [showPhone, setShowPhone] = useState(false);
    const email = useRef('');
    const firstName = useRef('');
    const lastName = useRef('');
    const phone = useRef('');
    const handleSubmit = () => {
        console.log({
            email:email.current,
            firstName: firstName.current,
            lastName: lastName.current,
            phone: phone.current
        })
    }

    return(
        <div>
            <Button color="inherit" className={classes.button} onClick={()=>setOpen(true)}>
                <Typography style={{fontWeight: 600}}>
                    UPDATE PROFILE
                </Typography>
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={()=>setOpen(false)}
                style={{backgroundColor: 'transparent', boxShadow: 'none'}}
            >
                <Card style={{width: 500, backgroundColor: '#2A333A', boxShadow: 'none', borderRadius: 0}}>
                    <CardContent style={{backgroundColor: '#2A333A', borderRadius: 50}}>
                        <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                            Update your profile
                        </Typography>


                        <form onSubmit={handleSubmit}>
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your email
                                    <Checkbox
                                        disableRipple
                                        checked={showEmail}
                                        onChange={()=>setShowEmail(!showEmail)}
                                        name="change-email"
                                        color="primary"
                                        style={{
                                            marginLeft: 180, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showEmail} unmountOnExit>
                            <Grow in={showEmail} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="EMAIL" style={{minWidth: '100%', marginTop: 10}} type='email' onChange={(e)=>email.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                    
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your first name
                                    <Checkbox
                                        disableRipple
                                        checked={showFirstName}
                                        onChange={()=>setShowFirstName(!showFirstName)}
                                        name="change-first-name"
                                        color="primary"
                                        style={{
                                            marginLeft: 127, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showFirstName} unmountOnExit>
                            <Grow in={showFirstName} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="FIRST NAME" style={{minWidth: '100%', marginTop: 10}} type='text' onChange={(e)=>firstName.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your last name
                                    <Checkbox
                                        disableRipple
                                        checked={showLastName}
                                        onChange={()=>setShowLastName(!showLastName)}
                                        name="change-last-name"
                                        color="primary"
                                        style={{
                                            marginLeft: 130, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>
                        <Collapse in={showLastName} unmountOnExit>
                            <Grow in={showLastName} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="LAST NAME" style={{minWidth: '100%', marginTop: 10}} type='text' onChange={(e)=>lastName.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        

                        <Card style={{marginBottom: 10}}>
                            <CardContent style={{backgroundColor: '#024873'}}>
                                <Typography style={{color: 'white', fontSize: 25, height: 10, paddingBottom: 15}}>
                                    Change your phone number
                                    <Checkbox
                                        disableRipple
                                        checked={showPhone}
                                        onChange={()=>setShowPhone(!showPhone)}
                                        name="change-phone-number"
                                        color="primary"
                                        style={{
                                            marginLeft: 80, 
                                            transform: 'scale(2)',
                                            marginTop: -18,
                                            backgroundColor: 'transparent'
                                        }}
                                    />
                                </Typography>
                            </CardContent>
                        </Card>

                        <Collapse in={showPhone} unmountOnExit>
                            <Grow in={showPhone} timeout={300} unmountOnExit>
                                <Card style={{marginBottom: 20}}>
                                    <CardContent style={{backgroundColor: '#608BA6'}}>
                                        <TextField id="outlined-basic" label="" variant="outlined" placeholder="PHONE" style={{minWidth: '100%', marginTop: 10}} type='number' onChange={(e)=>phone.current=e.target.value}/>
                                    </CardContent>
                                </Card>
                            </Grow>
                        </Collapse>
                        
    
                     
                        
                        <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleSubmit} type='submit'>
                            <Typography style={{color: 'white', fontWeight: 600}}>
                                UPDATE!
                            </Typography>
                        </Button>
                        </form>
                    </CardContent>
                </Card>
            </Dialog>
        </div>
    )
}