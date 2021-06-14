import React from 'react';
//import './classreg.scss';
import {Form,Button,Card} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {useRef,useState} from 'react';
import {useAuth} from '../components/contexts/AuthContext';
import db from './firebase/firebase'
function ClassRegister() {
  const nameRef = useRef();
  const materiaRef = useRef();  
  const {signup,currentUser} = useAuth();
  const [loading,setLoading]=useState(false);
  var docRef = db.collection("utilizatori").doc(currentUser.uid);

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log(signup, setLoading);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

    return (
      <Container className="d-flex align-items-center justify-content-center"
      style = {{minHeight:"100vh"}}>
<div className="w-100" style= {{maxWidth:"400px"}}>
<Button>Inregistreaza-te ca elev</Button>
             
       <Card>
           <Card.Body>
               <h2 className="text-center mb-4">Creeaza o Clasa</h2>
               <Form>
              <Form.Group id="Name">
                  <Form.Label>Numele Clasei</Form.Label>
                  <Form.Control type = "name" ref = {nameRef} required/>
                  </Form.Group>
                  <Form.Group id="materia">
                  <Form.Label>Materia</Form.Label>
                  <Form.Control type = "name" ref = {materiaRef} required/>
                  </Form.Group>
             
          
      
              <Form.Check
        required
        label="Sunt de acord cu termenii si conditiile" 
        feedback="Trebuie sa fii de acord pentru a crea clasa."
      />  
     
                  <Button disabled={loading} className="w-100" type = "submit">Inregistreaza</Button>
              </Form>
                  
           </Card.Body>
       </Card>  
      
      </div>       
      </Container>
    );
}
export default ClassRegister;