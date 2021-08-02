import React,{useEffect,useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import {db,auth} from './firebase/firebase';
import {data, change} from '../store/data';
import Grid from '@material-ui/core/Grid';
import CircularProgress from "@material-ui/core/CircularProgress";

function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}


export default function StudentConnectedPrivateRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();
  const forceUpdate = useForceUpdate();
  console.log(currentUser);

    if("userData" in data.getState()) {
      return (
        <Route
        {...rest}   
        render={  props =>  {
        if(currentUser) {
          
    
      if( data.getState().userData.type ==='student')
    
        {   return( 
          <Component {...props} /> )} //teacher
      else 
      return( <Redirect to="/profile" />)
        }
        else
      ( <Redirect to="/" />)
          
      }}
        ></Route>
      )
    } else {
      return(
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
            }} onMouseMove={forceUpdate}/>
          <Grid item xs={6}>
          </Grid>
        </Grid>
      </>
      ) 
    }

}