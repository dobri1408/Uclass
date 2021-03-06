import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
        root: {
        background: 'linear-gradient(-45deg, #F2C894 30%, #D99152 90%)',
        borderRadius: 3,
        border: 0,
        color: 'black',
        height: 35,
        padding: '0 30px',
        //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
        label: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
        },
        root2: {
            background: 'linear-gradient(-45deg, #2A333A 30%, #2A333A 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 35,
            padding: '0 30px',
            //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
  });


export default function Navbar(props) {
    const classes = useStyles();
    // const [currentButton, setCurrentButton] = useState('activity');
    return (
        <div >

        <AppBar position="static" style={{backgroundColor: '#2A333A'}}>
            <Toolbar>

                <Grid container>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={2}>
                        {
                            props.v === 'activity' ? 
                            <Button color="white" classes={{root: classes.root, label: classes.label}} onClick={()=>props.f('activity')}>
                                ACTIVITY
                            </Button> :
                            <Button color="white" classes={{root: classes.root2, label: classes.label}} onClick={()=>props.f('activity')}>
                                ACTIVITY
                            </Button> 
                        }
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={2}>
                        {
                            props.v === 'homework' ? 
                            <Button color="white" classes={{root: classes.root, label: classes.label}} onClick={()=>props.f('homework')}>
                                HOMEWORK
                            </Button> :
                            <Button color="white" classes={{root: classes.root2, label: classes.label}} onClick={()=>props.f('homework')}>
                                HOMEWORK
                            </Button> 
                        }
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>

                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={2}>
                        {
                            props.v === 'tests' ? 
                            <Button color="white" classes={{root: classes.root, label: classes.label}} onClick={()=>props.f('tests')}>
                                TESTS
                            </Button> :
                            <Button color="white" classes={{root: classes.root2, label: classes.label}} onClick={()=>props.f('tests')}>
                                TESTS
                            </Button> 
                        }
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
            
                </Grid>

            </Toolbar>
        </AppBar>

        </div>
  );
}