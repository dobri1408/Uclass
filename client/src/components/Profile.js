import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useAuth } from '../components/contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { db } from './firebase/firebase';
// import {storage} from './firebase/firebase';
import NavbarProf from './NavbarProf';
import './profile.css';
function Profile() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const [feb, setfeb] = useState(0);
  const history = useHistory();
  const [nume, setNume] = useState('');
  const [scoala, setScoala] = useState('');
  const [email, setEmail] = useState('');
  const [tip, setTip] = useState('');
  const [numarclase, setnumarclase] = useState(0);
  const [telefon, settelefon] = useState(0);
  const [citat, setcitat] = useState("");

  const userRef = db.collection('utilizatori').doc(currentUser.uid)
  userRef.get().then((docSnapshot) => {
    if (docSnapshot.exists) {
      setnumarclase(docSnapshot.data().numarclase);
      setTip(docSnapshot.data().tip);
      setEmail(docSnapshot.data().email);
      setScoala(docSnapshot.data().scoala);
      setNume(docSnapshot.data().nume);
      settelefon(docSnapshot.data().telefon);
      setcitat(docSnapshot.data().citat);
      setfeb(docSnapshot.data().feedback);
    }
    else {
      userRef.set({
        nume: localStorage.getItem('nume'),
        numarclase: 0,
        tip: localStorage.getItem('tip'),
        email: localStorage.getItem('email'),
        scoala: localStorage.getItem('scoala'),
        telefon: localStorage.getItem('telefon'),
        citat: localStorage.getItem('citat'),
        feedback: 0
      })
      setnumarclase(0);
      setTip(localStorage.getItem('tip'));
      setEmail(localStorage.getItem('email'));
      setScoala(localStorage.getItem('scoala'));
      setNume(localStorage.getItem('nume'));
      settelefon(localStorage.getItem('telefon'));
      setcitat(localStorage.getItem('citat'));
      setfeb(0);
    }
  });
  async function handleLogout() {

    setError('');
    try {
      await logout();
      history.pushState('/signprofesor')
    }
    catch {
      setError('Nu te-am putut deconecta')
    }
  }
  /*
    <input type="file" onChange={handleImageAsFile}/>
 <button onClick={handleFireBaseUpload}>Save</button>
 <img src={imageAsUrl.imgUrl} alt="image tag" />
 
  */
  return (
    <>
      <NavbarProf />
      <div class="v15_73"><div class="v15_74"></div><span class="v15_75">task bar</span><div class="v15_76"></div><div class="name"></div><div class="v17_32"></div><span class="v17_39">
<h2>Nume: {nume}</h2>
<h2>Email: {email}</h2>

<h2>Scoala: {scoala}</h2>
<h2>Rol: {tip === 'prof' ? 'profesor' : 'elev'}</h2>

<h2>Citat Favorit: “{citat}”</h2></span><div class="v17_47"></div><div class="v17_48"></div><span class="v17_31">Schimba fotografia</span><span class="v17_49">Schimba datele personale</span></div>
         </>
  )
}


export default Profile
/*<h1>Rol:{tip}</h1>
      <Link to = "/update-profile" className="btn btn-primary w-100 mt-3">
          Actualizeaza Contul
      </Link>
        </Card.Body>
      </Card>
      <div className ="w-100 text-center mt-2">
      <Button variant="link" onClick={handleLogout}>
        Deconecteaza
        </Button>
      </div>*/