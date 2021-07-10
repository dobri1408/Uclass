import React from "react";
import {useHistory} from "react-router-dom";
const LeaveRoomButton = ({ room }) => {
    const history = useHistory()
  const HandleRoomDisconnection = () => {
    room.disconnect();
    
  
  history.push('/teachertimetable');
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={HandleRoomDisconnection}>
        Iesi din Pregatire
      </button>
    </div>
  );
};

export default LeaveRoomButton;