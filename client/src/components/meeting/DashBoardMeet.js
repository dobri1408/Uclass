import React,{useEffect} from 'react'
import './Meet.css';
import io from 'socket.io-client';
import Peer from 'peerjs';
import {useRef,useState} from 'react'
import { useParams } from "react-router-dom";
import { connectWithWebScocket } from './wssConnection';
import NavbarProf from '../NavbarProf';

function DashBoardMeet() {

useEffect(() => {
connectWithWebScocket();
},[])
    return (
      <>
      <NavbarProf/>
        <div className='dashboard_container background_main_color'>
        <div className='dashboard_left_section'>
          <div className='dashboard_content_container'>
              content
          </div>
          <div className='dashboard_rooms_container background_secondary_color'>
              rooms
          </div>
        </div>
        <div className='dashboard_right_section background_secondary_color'>
          <div className='dashboard_active_users_list'>
            users
          </div>
          <div className='dashboard_logo_container'>
          </div>
        </div>
      </div>
      </>
    )
}

export default DashBoardMeet;


