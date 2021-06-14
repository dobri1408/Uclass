import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom";
// import {storage} from './firebase/firebase';

export default function UpdateProfile() {
 var name = localStorage.getItem('name');
 var school = localStorage.getItem('scoala');
 var citat = localStorage.getItem('citat');
//  var telefon = localStorage.getItem('telefon');

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const numeRef = useRef();
  const scoalaRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  // const allImputs = {imgUrl: ''}
 
  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Parolele nu se potrivesc")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
    {console.log(school)}

        <Card>
        <Card.Body>
         
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
        
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Nume</Form.Label>
              <Form.Control
                type="name"
                ref={numeRef}
                required
                defaultValue={name}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Scoala</Form.Label>
              <Form.Control
                type="school"
                ref={scoalaRef}
                required
                defaultValue={school}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Citat</Form.Label>
              <Form.Control
                type="school"
                ref={scoalaRef}
                required
                defaultValue={citat}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Parola</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Daca vrei sa ai acceasi parola nu completa nimic aici"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Repeta Noua Parola</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Daca vrei sa ai acceasi parola nu completa nimic aici"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Actualizeaza
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/profile">Anuleaza</Link>
      </div>
    </>
  )
}