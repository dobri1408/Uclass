import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase/firebase"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password,nume,scoala,tip,telefon,citat) {
    localStorage.setItem('nume',nume)
    localStorage.setItem('scoala',scoala)
    localStorage.setItem('citat',citat)
    localStorage.setItem('telefon',telefon)
    localStorage.setItem('email',email)
    localStorage.setItem('tip',tip)
 return  auth.createUserWithEmailAndPassword(email, password);
    }


  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
    
  }


  function logout() {
    return auth.signOut()
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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
        setLoading(false)
    })

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