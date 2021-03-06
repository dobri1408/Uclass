import React,{useEffect} from 'react'
import './RoomPage.css';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import VideoSection from './VideoSection/VideoSection';
import ChatSection from './ChatSection/ChatSection';
import NavbarProf from '../NavbarProf';
import {connect} from 'react-redux';
import { setTwilioAccessToken } from "../../store/actions";
import { getTokenFromTwilio } from "../../utils/twilioUtils";
import Overlay from './Overlay'
const RoomPage =(props) => {
  const { identity, setTwilioAccessTokenAction, showOverlay } = props;
  useEffect(() => {
    getTokenFromTwilio(setTwilioAccessTokenAction, identity);
  }, []);  
  return (
      <>
      <NavbarProf/>
      <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      {showOverlay && <Overlay/>}
    </div>
</>
    )
}

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    setTwilioAccessTokenAction: (token) =>
      dispatch(setTwilioAccessToken(token)),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(RoomPage);
