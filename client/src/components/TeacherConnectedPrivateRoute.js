import React,{useEffect,useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

import {db,auth} from './firebase/firebase';
import {data, change} from '../store/data';
export default function TeacherConnectedPrivateRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();

console.log(currentUser);

const [loading, setLoading] = useState(false)
useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(true);
    console.log('This will run after 1 second!')
  }, 3000);
  return () => clearTimeout(timer);
}, []);
  if(!loading) 
  return <div>Loading...</div>
else
  return (
    <Route
    {...rest}   
    render={  props =>  {
     if(currentUser) {
      
 
   if( data.getState().userData.type ==='teacher')
 
    {   return( 
      <Component {...props} /> )} //teacher
  else 
  return( <Redirect to="/student-profile" />)
    }
    else
   ( <Redirect to="/" />)
      
  }}
    ></Route>
  )

}