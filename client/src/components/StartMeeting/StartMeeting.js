import React,{useEffect} from 'react'
import NavbarProf from '../NavbarProf';
import './StartMeeting.css';
import ConnectingButtons from './ConnectingButtons';
import {connect} from 'react-redux';
import {setIsRoomHost} from '../../store/actions';
const  StartMeeting =({setIsRoomHostAction})=> {
    useEffect(() => {
        setIsRoomHostAction(false);
    },[])
    return (
        <>
        <NavbarProf/>
        <div className='introduction_page_container'>
           <div className='introduction_page_panel'>
               <ConnectingButtons/>
               </div>
        </div>
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
      setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(StartMeeting);