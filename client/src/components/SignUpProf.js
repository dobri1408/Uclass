import React from 'react';
import { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Pdf from '../../src/components/Azur.pdf';
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";
import { db } from './firebase/firebase';
import { auth } from './firebase/firebase';
import { CheckBox } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import {storage} from '../components/firebase/firebase'
export default function SignupProf() {
    const emailRef = useRef();
    const nameRef = useRef();
    const telefonRef = useRef();
    const scoalaRef = useRef();
    const citatRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e) {

        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Parolele nu sunt identice');
        }

        try {
            setError("")
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value, nameRef.current.value, scoalaRef.current.value, "prof", telefonRef.current.value, citatRef.current.value)
            .then((user) => {
                    user = auth().currentUser;
                    console.log(user.uid);
                })

        } catch {
            setError("Nu am putut creea contul, incercati mai tarziu")
        }
        setLoading(false);


        history.push("/profile")
    }
    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Button>Inregistreaza-te ca elev</Button>

                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Inregistreaza-te ca Profesor</h2>
                        {error && <Alert variant="danger">{error}</Alert>}     <Form onSubmit={handleSubmit}>
                            <Form.Group id="Name">

                                <Form.Label>Numele si Prenumele</Form.Label>
                                <Form.Control type="name" ref={nameRef} required />
                            </Form.Group>

                            <Form.Group id="Scoala">
                                <Form.Label>Scoala</Form.Label>
                                <Form.Control type="scoala" ref={scoalaRef} required />

                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />

                            </Form.Group>
                            <Form.Group id="telefon">
                                <Form.Label>Telefon</Form.Label>
                                <Form.Control type="telefon" ref={telefonRef} required />

                            </Form.Group>
                            <Form.Group id="telefon">
                                <Form.Label>Citatul tau preferat</Form.Label>
                                <Form.Control type="citat" ref={citatRef} />

                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Parola</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />

                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Reintroduceti Parola</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />

                            </Form.Group >

                            <Form.Group id="photo-update">
                            
                            <Form.File id = "fileupload" label ="Daca doresti o fotografie de profil pune o aici"/>
                            
                                
                            </Form.Group>

                            <Form.Check
                                label="Doresti o sedinta gratuita de introducere in platforma?"
                            />

                            <Form.Check
                                required
                                label="Sunt de acord cu termenii si conditiile"
                                feedback="Trebuie sa fii de acord pentru a realiza contul."
                            />
                            <a href={Pdf} target="_blank">Vezii termenii si conditiile</a>

                            <Button disabled={loading} className="w-100" type="submit">Inregistreaza</Button>
                        </Form>

                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Ai deja cont? <Link to="/login">Logheaza-te</Link>
                </div>
            </div>
        </Container>
    )
}

