import React from 'react';
import {useLocation} from 'react-router-dom';
import NavbarProf from '../NavbarProf';
import NewPost from './NewPost';
// import {v4 as uuidV4} from 'uuid';



export default function Classroom () {
    const { state } = useLocation();
    return (
        <div>
            <NavbarProf/>
            <div style={{backgroundColor: "pink"}}>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="file" id="file"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            <h1 style={{color:"white", textAlign: "center", paddingTop: "50px"}}>This is the feed page for {state.name}</h1>
            <NewPost/>
        </div>
    )
    
}