import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../LOGO UCLASS ALB full.png';
import UsernameInput from './components/UsernameInput';
import SubmitButton from './components/SubmitButton';
import { useHistory } from 'react-router-dom';
import { setUsername } from '../store/actions/dashboardActions';
import { registerNewUser } from '../utils/wssConnection/wssConnection';
import './LoginPage.css';
import {db} from '../firebase/firebase';
import {useAuth } from '../contexts/AuthContext'
import NavbarProf from '../NavbarProf';

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState('');
  const {currentUser} = useAuth();

  const userRef = db.collection('utilizatori').doc(currentUser.uid)
  userRef.get().then( (docSnapshot) => {
     setUsername(docSnapshot.data().nume);
  })
  
  const history = useHistory();

  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    saveUsername(username);
    history.push('/dashboard');
  };

  return (
    <>
    <NavbarProf/>
    <div className='login-page_container background_main_color'>
      <div className='login-page_login_box background_secondary_color'>
      <div className='login-page_logo_container'>
          <img className='login-page_logo_image' src={logo} alt='VideoTalker' />
        </div>
        <div className='login-page_title_container'>
       
        </div>
         <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
    </div>
  </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: username => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
