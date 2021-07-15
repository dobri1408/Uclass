import React, { useState,useEffect } from 'react'
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
  const [profileImageUrl,setProfileImageUrl]=useState('')
  const [nume, setNume] = useState('');
  const [scoala, setScoala] = useState('');
  const [email, setEmail] = useState('');
  const [tip, setTip] = useState('');
  const [numarclase, setnumarclase] = useState(0);
  const [telefon, settelefon] = useState(0);
  const [citat, setcitat] = useState("");
useEffect(() => {
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
      setProfileImageUrl(docSnapshot.data().profileImageUrl)
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
        feedback: 0, 
        profileImageUrl: localStorage.getItem('profileImageUrl'),
      })
      setnumarclase(0);
      setTip(localStorage.getItem('tip'));
      setEmail(localStorage.getItem('email'));
      setScoala(localStorage.getItem('scoala'));
      setNume(localStorage.getItem('nume'));
      settelefon(localStorage.getItem('telefon'));
      setcitat(localStorage.getItem('citat'));
      setfeb(0);
      setProfileImageUrl(localStorage.getItem('profileImageUrl'));
    }
  });
  if(profileImageUrl)  {

    var image = document.querySelector('.v84_20');
    if(image){
   console.log(profileImageUrl);
   
      image.style.background = 'url('+profileImageUrl+')';
      image.style.backgroundSize='cover';
      image.style.backgroundRepeat='no-repeat';
      image.style.backgroundPosition='center center';
    }
    else console.log("nu am fost gasit");
  }
  else
    console.log("nu gasim urlul");
})
  
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

 useEffect(() => {
   
 },[])
  return (
    <>
      <NavbarProf />
      <div class="v15_73"><div class="v15_74"></div><span class="v15_75">task bar</span><div class="name"></div><div class="v17_32"></div><span class="v17_39">
<h3>Nume: {nume}</h3>

<h3>Email: {email}</h3>

</span><div class="v17_47"></div><div class="v17_48"></div><span class="v17_31">Schimba fotografia</span><span class="v17_49">Schimba datele personale</span><div class="v84_20"></div></div>
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