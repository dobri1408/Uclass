import React,{useEffect} from "react";
import { connect } from "react-redux";
import RoomLabel from "./RoomLabel";
import {connectToRoom} from '../../../utils/twilioUtils'
import TwilioRoom from "./TwilioRoom/TwilioRoom";

const Videos = ({ room, setRoom, roomId, twilioAccessToken }) => {
  useEffect(() => {
    if (twilioAccessToken) {
      console.log("muita");
      
      connectToRoom(twilioAccessToken, roomId, setRoom);
    }
  }, [twilioAccessToken]);
  return (
    <div className="videos_container">
      <RoomLabel roomId={roomId} />
      {room && <TwilioRoom room={room} />}
    </div>
  );
};

const mapStoreStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStoreStateToProps)(Videos);   