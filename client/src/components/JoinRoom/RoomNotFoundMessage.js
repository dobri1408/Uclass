import React from "react";

const RoomNotFoundMessage = ({ showRoomNotFoundMessage }) => {
  return (
    <div className="room_not_found_container">
      {showRoomNotFoundMessage && (
        <p className="room_not_found_paragraph">
       Pregatirea nu exista, verifica daca ai introdus datele corect
        </p>
      )}
    </div>
  );
};

export default RoomNotFoundMessage;