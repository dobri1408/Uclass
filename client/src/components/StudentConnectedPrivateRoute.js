import React,{useEffect,useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import {data} from '../store/data'
export default function StudentConnectedPrivateRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();
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
      render={props => {
       if(currentUser) {
     if(data.getState().userData.type ==='student')

      {  return( 
        <Component {...props} />) } //student
    else 
    return( <Redirect to="/profile" />) //teacher
      }
      else
     ( <Redirect to="/" />)
        
    }}
    ></Route>
  )
}