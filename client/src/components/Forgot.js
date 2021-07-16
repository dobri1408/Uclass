// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "./contexts/AuthContext";
// import { Link } from "react-router-dom"



// export default function Forgot() {
//   const emailRef = useRef()
//   const { resetPassword } = useAuth()
//   const [error, setError] = useState("")
//   const [message, setMessage] = useState("")
//   const [loading, setLoading] = useState(false)



//   async function handleSubmit(e) {
//     e.preventDefault()

//     try {
//       setMessage("")
//       setError("")
//       setLoading(true)
//       await resetPassword(emailRef.current.value)
//       setMessage("Verifica emailul pentru a-ti schimba parola")
//     } catch {
//       setError("Nu am putut sa iti schimbam parola, incearca mai tarziu");
//     }

//     setLoading(false)
//   }
  
//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Schimba Parola</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           {message && <Alert variant="success">{message}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Schimba Parola
//             </Button>
//           </Form>
//           <div className="w-100 text-center mt-3">
//             <Link to="/login">Login</Link>
//           </div>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Nu ai un cont? <Link to="/signprofesor">Creeaza cont</Link>
//       </div>


//     </>
//   )
// }


import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import {useAuth} from './contexts/AuthContext';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
  typoRight: {
    color: 'white', 
    fontWeight: 600, 
    textAlign: 'right',
    '&:hover': {
      color: '#608BA6',
      // marginBottom: 10,
    }
  },
  typoLeft: {
    color: 'white', 
    fontWeight: 600, 
    '&:hover': {
      color: '#608BA6',
      // marginBottom: 10,
    }
  }
}));

export default function Login() {
  const classes = useStyles();
  const emailRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  // const history = useHistory()
  const { resetPassword } = useAuth()



    async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("Verifica emailul pentru a-ti schimba parola")
      setLoading(true)
      console.log(emailRef.current)
      await resetPassword(emailRef.current)
    } catch {
      setError("Nu am putut sa iti schimbam parola, incearca mai tarziu");
    }

    setLoading(false)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={4}> 
        </Grid>
        <Grid item xs={4}> 
            <Card style={{marginTop: 20}}>
              <CardContent style={{backgroundColor: '#2A333A'}}>
                <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 30, paddingBottom: 20}}>
                  Change password
                </Typography>
                {
                  error &&
                  <Card style={{marginBottom: 20}}>
                    {/* <CardHeader>

                    </CardHeader> */}
                    <CardContent style={{backgroundColor: '#E57373'}}>
                      <Grid container>
                        <Grid item xs={2}>
                          {
                            loading ? 
                            <CircularProgress style={{color: 'white', marginTop: 20, marginLeft: 20, marginBottom: 20}}/>:
                            <ErrorIcon style={{color: 'white', transform: 'scale(1.8)', marginTop: 20, marginLeft: 20, marginBottom: 20}}/>
                          }

                        </Grid>  
                        <Grid item xs={10}>
                          <Typography style={{color: 'white', fontWeight: 600, textAlign: 'center', fontSize: 20, marginTop: 5}}>
                            {error}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                }
                <form onSubmit={handleSubmit}>
                <Card style={{marginBottom: 20}}>
                  <CardContent style={{backgroundColor: '#608BA6'}}>

                  {/* <TextField id="standard-basic" label="Email" style={{minWidth: '100%'}}/> */}
                  <TextField id="outlined-basic" label="" variant="outlined" placeholder="EMAIL" style={{minWidth: '100%'}} type='email' onChange={(e)=>emailRef.current=e.target.value}/>
                  </CardContent>
                </Card>
                
                <Button variant="contained" style={{marginTop: 20, minWidth: '100%', backgroundColor: '#024873'}} onClick={handleSubmit} type='submit'>
                  <Typography style={{color: 'white', fontWeight: 600}}>
                    CHANGE PASSWORD
                  </Typography>
                </Button>
                </form>
                <Grid container style={{marginTop: 20}}>
                  <Grid item xs={6}>
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                      <Typography className={classes.typoLeft}>
                        Have an account? Login!
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Link to="/signprofesor" style={{ textDecoration: 'none' }}>
                      <Typography className={classes.typoRight}>
                        Create an account!
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>


              </CardContent>
            </Card>
        </Grid>
        <Grid item xs={4}> 
        </Grid>

      </Grid>



    </>
  )
}