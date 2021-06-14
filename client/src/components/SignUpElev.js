import React from 'react';
import {useRef} from 'react';
import {Form,Button,Card} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import Pdf from '../../src/components/Azur.pdf';
export default function SignUpElev() {
    const emailRef = useRef();
    const nameRef = useRef();
    const scoalaRef = useRef();
    const clasaRef= useRef();
    const passwordRef = useRef();
    const passwordConfirmRef=useRef();
    return (
        <Container className="d-flex align-items-center justify-content-center"
        style = {{minHeight:"100vh"}}>
<div className="w-100" style= {{maxWidth:"400px"}}>
<Button>Inregistreaza-te ca profesor</Button>
               
         <Card>
             <Card.Body>
                 <h2 className="text-center mb-4">Inregistreaza-te ca Elev sau Cursant</h2>
                 <Form>
                <Form.Group id="Name">
                    <Form.Label>Numele si Prenumele</Form.Label>
                    <Form.Control type = "name" ref = {nameRef} required/>
                    </Form.Group>
               
                    <Form.Group id="Unitatea de Invatamant actuala">
                    <Form.Label>Scoala</Form.Label>
                    <Form.Control type = "scoala" ref = {scoalaRef} required/>
                       
                </Form.Group>
                <Form.Group id="Clasa sau Anul">
                    <Form.Label>Clasa sau Anul</Form.Label>
                    <Form.Control type = "scoala" ref = {clasaRef} required/>
                       
                </Form.Group>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" ref = {emailRef} required/>
                       
                </Form.Group>

                <Form.Group id="password">
                    <Form.Label>Parola</Form.Label>
                    <Form.Control type = "password" ref = {passwordRef} required/>
                       
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Reintroduceti Parola</Form.Label>
                    <Form.Control type = "password" ref = {passwordConfirmRef} required/>
                       
                </Form.Group>
            
                <Form.Check
          required
          label="Sunt de acord cu termenii si conditiile" 
          feedback="Trebuie sa fii de acord pentru a realiza contul."
        />  
         <a href = {Pdf} target = "_blank">Vezii termenii si condtiile</a>
    
                    <Button className="w-100" type = "submit">Inregistreaza</Button>
                </Form>
                    
             </Card.Body>
         </Card>  
        <div className="w-100 text-center mt-2">
            Ai deja cont? Logheaza-te
        </div>
        </div>       
        </Container>
    )
}

