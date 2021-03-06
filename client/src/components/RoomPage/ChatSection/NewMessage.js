import React from 'react'
import {useState} from 'react';
import { sendMessageUsingDataChannel } from '../../../utils/twilioUtils';
import SendMessageButton from "../../sendMessageButton.svg";
const NewMessage = () => {
    const [message,setMessage] = useState("");
    
  const sendMessage = () => {
    // send message to other user
   sendMessageUsingDataChannel(message, true)
    console.log(message);
    setMessage("");
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //sendMessage To other user
      sendMessage();
    }
  };
  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };
    return (
        <div className="new_message_container">
          <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Scrie un mesaj..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
       <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />
        </div>
    )
}

export default NewMessage
