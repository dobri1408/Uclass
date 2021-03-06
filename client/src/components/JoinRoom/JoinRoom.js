import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux';
import {setIsRoomHost} from '../../store/actions'
import {useLocation} from 'react-router-dom';
import './JoinRoom.css';
import JoinRoomTitle from './JoinRoomTitle';
import JoinRoomContent from './JoinRoomContent';
import LoadingOverlay from './LoadingOverlay';
const JoinRoom = (props) =>{
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const { setIsRoomHostAction, isRoomHost } = props;
    const search = useLocation().search;

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      setIsRoomHostAction(true);
    }
  }, []);
    return (
        <div className="join_room_page_container">
      <div className="join_room_page_panel">
      <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent 
        setShowLoadingOverlay = {setShowLoadingOverlay}
        setLoading/>
      {showLoadingOverlay &&  <LoadingOverlay/>}
             </div>
    </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        ...state,

    }
}


const mapStoreStateToProps = (state) => {
    return {
      ...state,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
    };
  };
  
  export default connect(mapStoreStateToProps, mapDispatchToProps)(JoinRoom);