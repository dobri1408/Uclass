import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import {data} from '../store/data'
export default function ConnectedPrivateRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}   
      render={props => {
       if(currentUser) {
      return( 
        <Component {...props} />)  
      }
      else
     ( <Redirect to="/" />)
        
    }}
    ></Route>
  )
}