import React from 'react';
import './StartMeeting.scss';
import Header from './HeaderStart.js'
import NavbarProf from '../NavbarProf';
import shortid from "shortid";
import {useHistory}from   "react-router-dom";
const StartMeeting = () => {
   const history = useHistory();

    const startCall = () => {
        //generate a meeting linkElement
        const uid = shortid.generate();
        history.push(`meeting/${uid}#init`)
    }
    return (
        <>
        <NavbarProf/>
        <Header/>
        <h1>Intra la un curs</h1>
        <button onClick={startCall}>Incepe un Meeting</button>
        
    </>
    )
}
export default StartMeeting;