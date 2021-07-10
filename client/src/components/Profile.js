import React,{useState} from 'react'
import {Button} from 'react-bootstrap'
import {useAuth} from '../components/contexts/AuthContext';
import {Link,useHistory} from 'react-router-dom';
import {db} from './firebase/firebase';
// import {storage} from './firebase/firebase';
import NavbarProf from './NavbarProf';
import './profile.scss';
function Profile() {
  const [error,setError] = useState('');
  const {currentUser,logout}=useAuth(); 
  const [feb,setfeb] = useState(0);
  const history = useHistory();
  const [nume,setNume] = useState('');
  const [scoala,setScoala]  = useState('');
  const [email,setEmail] = useState('');
  const [tip,setTip] = useState('');
  const [numarclase,setnumarclase] = useState(0);
  const [telefon,settelefon] = useState(0);
  const [citat,setcitat] = useState("");

const userRef = db.collection('utilizatori').doc(currentUser.uid)
userRef.get().then( (docSnapshot) => {
if(docSnapshot.exists){
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
        nume : localStorage.getItem('nume'),
        numarclase:0,
        tip:localStorage.getItem('tip'),
        email:localStorage.getItem('email'),
        scoala:localStorage.getItem('scoala'),
        telefon:localStorage.getItem('telefon'),
        citat:localStorage.getItem('citat'),
        feedback:0
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
catch{
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
      <NavbarProf/>
     
<div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                       {nume}
                                    </h5>
                                    <h6>
                                        {tip === "prof" ? "Profesor" : "Elev"}
                                    </h6>
                                    <p class="proile-rating">Feedback Elevi: <span>{(feb>0) ? feb : "nedefinit"}/10</span></p>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Despre</a>
                                </li>
                             
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                    <Link to = "/update-profile">

                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Actualizeaza"/>
                        </Link>
                        <Button variant="link" onClick={handleLogout}>
        Deconecteaza  
        </Button> 
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                    <i>  "{citat}"</i> 
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Nume</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{nume}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Clase</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{numarclase}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Telefon</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{telefon}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Scoala</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{scoala}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Profesie</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Profesor Limba Romana </p>
                                            </div>
                                        </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </form>           
        </div>
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