import React from 'react'
import NavbarProf from './NavbarProf';
import NavbarMic from './NavbarMic';
import Popout from 'react-popout';
import '../clases.scss';
import {Button} from 'react-bootstrap';
import {useAuth} from './contexts/AuthContext';
import { Link } from 'react-router-dom';
import ClassRegister from './ClassRegister';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { Form, Card, Alert,Container } from 'react-bootstrap';
import {useRef,useInput} from 'react';
//import "./classreg.scss";
var data  = {
"title" : "11G",
"category" :"Limba Romana",
"profesor" : "Eliza Iordache"
};

function Class() {
       const {currentUser,logout}=useAuth(); 
   const [pop, setpop] = useState(0);
  const [valueRef,setvalueRef]  = useState("");
  let history=useHistory();
  const handleSubmit = (env) =>{
    env.preventDefault();
    console.log(valueRef);
       history.push(`/documents/${valueRef}`);
    }
    

  return (
        <>
        <NavbarProf/>
 	<form onSubmit={handleSubmit}>
<label>
    Numele Documentului nou:

</label>
<input type="text" id="value" value={valueRef} onChange={(e) =>setvalueRef(e.target.value)}/>
<input type ="submit" value="Submit" />
         </form>
     </>
    )
}

export default Class;
