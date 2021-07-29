import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/firebase"
import {db} from '../firebase/firebase';
import {LoadingOverlay} from '../JoinRoom/LoadingOverlay'
import {data, change} from '../../store/data';
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // function signup(email, password,nume,scoala,tip,telefon,citat,profileImageUrl) {
  //   localStorage.setItem('nume',nume)
  //   localStorage.setItem('scoala',scoala)
  //   localStorage.setItem('citat',citat)
  //   localStorage.setItem('telefon',telefon)
  //   localStorage.setItem('email',email)
  //   localStorage.setItem('tip',tip)
  //   localStorage.setItem('profileImageUrl',profileImageUrl)
  //   return  auth.createUserWithEmailAndPassword(email, password);
  
  // }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }


  async function login(email, password) {
  
   localStorage.clear();
    const user = await auth.signInWithEmailAndPassword(email, password);
    
  }

  function logout() {
    return auth.signOut();    
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(async () => {
    setLoading(true);
    
    const unsubscribe =  auth.onAuthStateChanged(user => {

      setCurrentUser(user);
      if(user) {
      const email = user.email;
      console.log(email);
      db.collection('type').doc(email).get().then(s=>{
        if(s.exists){
          if(s.data().type==='teacher') {
      if (user) {
 db.collection('users').doc(user.uid).get().then((snap) => {
          if (snap.exists) {
            db.collection('meetings').get().then((s) => {
              data.dispatch(change({
                userData: snap.data(),
                meetingsData: s.docs.map(e => e.data()),
                meetingsIDs: s.docs.map(e_1 => e_1.id)
              }));
            });
          }
    
        });
      }

    }
  else {
    if (user) {
      console.log("intru");
    db.collection("students").doc(user.uid).get().then((snap)=>{
      if(snap.exists){
        db.collection("meetings").get().then((s)=>{
          data.dispatch(change({
            userData: snap.data(),
            meetingsData: s.docs.map(e=>e.data()),
            meetingsIDs: s.docs.map(e=>e.id)
          }))
        })
      }
    })
  }
  }
        
    }})
  }})
    setLoading(false)
    return unsubscribe
  }, [])

 


  
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
       {!loading && children}
    </AuthContext.Provider>
  )
}