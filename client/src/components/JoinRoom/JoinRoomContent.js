import React,{useState} from 'react';
import {connect} from 'react-redux';
import JoinRoomInputs from './JoinRoomInputs';
import {setConnectOnlyWithAudio,setIdentity,setRoomId} from '../../store/actions';
import OnlyWithAudioCheckbox from './OnlyWithAudioCheckBox';
import JoinRoomButtons from './JoinRoomButtons';
import RoomNotFoundMessage from "./RoomNotFoundMessage";
import { checkIfRoomExists } from '../../utils/twilioUtils';
import {useHistory} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
const JoinRoomContent = (props) => {
    const {isRoomHost,setShowLoadingOverlay,setConnectOnlyWithAudioAction,connectOnlyWithAudio,setRoomIdAction,setIdentityAction} = props;
    const history = useHistory();
    const [roomIdValue,setRoomIdValue] = useState('')
    const [nameValue,setNameValue] = useState('')
    const [showRoomNotFoundMessage,setShowRoomNotFoundMessage] = useState(false);
const handleJoinToRoom = async () => {
    setIdentityAction(nameValue);
    if(!isRoomHost) { 
        //check if room exists and if yes join
        setShowLoadingOverlay(true);
const roomExists = await checkIfRoomExists(roomIdValue);
setShowLoadingOverlay(false);
if(roomExists) {
  setRoomIdAction(roomIdValue);
  history.push('/room');
}
else {
  setShowRoomNotFoundMessage(true);
}
    }
    else {
        setRoomIdAction(uuidv4());
        history.push('/room');
    }
}
    return (
    <>
    <JoinRoomInputs 
    roomIdValue = {roomIdValue}
    setRoomIdValue={setRoomIdValue}
    nameValue = {nameValue}
    setNameValue={setNameValue}
    isRoomHost = {isRoomHost}
    />
     <OnlyWithAudioCheckbox
        setConnectOnlyWithAudio={setConnectOnlyWithAudioAction}
        connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <RoomNotFoundMessage showRoomNotFoundMessage={showRoomNotFoundMessage} />
      <JoinRoomButtons
        isRoomHost={isRoomHost}
        handleJoinToRoom={handleJoinToRoom}
      />
    </>
        )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConnectOnlyWithAudioAction: (onlyWithAudio) =>
        dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
        setIdentityAction: (identity) => dispatch(setIdentity(identity)),
        setRoomIdAction: (id) => dispatch(setRoomId(id)),
 
    };
  };
  
  const mapStoreStateToProps = (state) => {
    return {
      ...state,
    };
  };
  
export default connect(
    mapStoreStateToProps,
    mapDispatchToProps
  )(JoinRoomContent);
