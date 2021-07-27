import React from 'react';
import NavbarStudent from './NavbarStudent';
import ClassCardStudent from './ClassCardStudent';
import { data } from '../../store/data';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

const ClassesStudent = () => {
    return(
        <div>
            <NavbarStudent/>
            <Button variant="contained" onClick={()=>console.log(data.getState().meetingsData)}>
                perfectly
            </Button>
            <Container style={{marginTop: "auto"}}>
            <Grid container spacing={3} style={{marginTop: 25}}>
            {
                ('meetingsData' in data.getState()) ?
                <>
                    {
                        data.getState().meetingsData
                        .filter((e,i)=>data.getState().userData.meetings.includes(data.getState().meetingsIDs[i]))
                        .map((e,index)=>{
                            return(
                                <ClassCardStudent className={e.className} subject={e.subject} key={index}/>
                            )
                        })
                    }
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
                        }}/>
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>  
                </>
            }
            </Grid>
            </Container>
        </div>
    )
}

export default ClassesStudent;