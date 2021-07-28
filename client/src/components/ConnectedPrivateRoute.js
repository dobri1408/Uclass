import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"

export default function ConnectedPrivateRoute({ comp: Component, ...rest }) {
  const { currentUser } = useAuth();
console.log(currentUser);
  return (
    <Route
      {...rest}   
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}