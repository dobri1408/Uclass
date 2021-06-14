import "./CallPageFooter.scss";
//import { FaVideoSlash } from "react-icons/fa";
//import "../../components/CALL.scss"
const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
  isCam,
  toggleCam
}) => {
  return (
    <div class="footer-item ">
    <button class="video-action-button mic" onClick={() => toggleAudio(!isAudio)}></button>
    <button class="video-action-button camera" onClick={() =>toggleCam(!isCam)}></button>
    { isPresenting ? (
 
    <button class="video-action-button maximize" onClick={stopScreenShare}></button>
    ):
    (
<button class="video-action-button maximize" onClick={screenShare}></button>
    
    )
  }
    <button class="video-action-button endcall" onClick={disconnectCall}>Leave</button>
   
  </div>

  );
};

export default CallPageFooter;