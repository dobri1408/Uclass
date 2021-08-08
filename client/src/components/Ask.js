import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import './Ask.scss'
import Test from './Animation/Test';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function Ask()  {
    let history = useHistory();
    const [student, setStudent] = useState(1);
    const [teacher, setTeacher] = useState(1);
    return (
        <>
        <Test/>
            {/* <div id='styleei'>
            <button id='esti_prof' onClick={()=>{history.push('/signprofesor')}}>
                <h1  style={{color:"white"}}>Teacher</h1>
            </button>
            <button id='esti_elev' onClick={()=>{history.push('/signelev')}}>
                <h1 style={{color:"black"}}>Student</h1>
            </button>
            </div> */}
            <Grid container>
                <Grid item xs={6}>
                    <CardActionArea 
                        style={styleLeft} 
                        onMouseEnter={()=>setStudent(5)} 
                        onMouseLeave={()=>setStudent(1)}
                        onClick={()=>{history.push('/signelev')}}
                    >
                        {
                            student === 1 &&
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                        }
                        {
                            student === 5 &&
                            <>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                STUDENT
                            </Typography>
                            </>
                        }
                    </CardActionArea>
                </Grid>
                <Grid item xs={6}>
                    <CardActionArea 
                        style={styleRight} 
                        onMouseEnter={()=>setTeacher(5)} 
                        onMouseLeave={()=>setTeacher(1)}
                        onClick={()=>{history.push('/signprofesor')}}
                    >
                        {
                            teacher === 1 &&
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                        }
                        {
                            teacher === 5 &&
                            <>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                            <Typography style={{
                                color: 'white',
                                fontSize: 50,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}>
                                TEACHER
                            </Typography>
                            </>
                        }
                    </CardActionArea>
                </Grid>
            </Grid>
        </>
    )
}

export default Ask

const styleLeft={
    zIndex: 200,
    position: 'fixed',
    borderRadius: 10,
    boxShadow: 'none',
    width: 500,
    height: 500,
    backgroundColor:'#2a323a',
    top: 200,
    left: 400
}

const styleRight={
    zIndex: 200,
    position: 'fixed',
    borderRadius: 10,
    boxShadow: 'none',
    width: 500,
    height: 500,
    backgroundColor:'#2a323a',
    top: 200,
    right: 400
}