import React, { useState, useEffect, useRef } from 'react';
import {useLocation} from 'react-router-dom';
import NavbarProf from '../NavbarProf';
import NewPost from './NewPost';
import Button from '@material-ui/core/Button';
import GeneralCard from './MeetingCards/GeneralCard';

import { db, auth } from '../firebase/firebase';


export default function Classroom () {
    const firebaseData = useRef([]);
    const data = useRef([]);
    const timestamps = useRef([]);
    const sortedData = useRef([]);
    const currentClassName = useRef('');
    // const meetingsData = useRef([]);
    const currentClassHash = useRef('');
    const [hash, setHash] = useState('');
    const [sortedData2, setSortedData2] = useState([]);
    const { state } = useLocation();

    currentClassName.current = state.name;
    
    useEffect((state)=>{
        const getData = async () => {
            await auth.onAuthStateChanged((user)=>{
                if(user) {
                  db.collection('users').doc(user.uid).get().then((snap)=>{
                      if(snap.exists) {
                        firebaseData.current = snap.data();
                        firebaseData.current.meetings.forEach((element)=>{
                          db.collection("meetings").doc(element).get().then((doc)=>{
                            if(doc.exists) {
                              if(doc.data().className === currentClassName.current) {
                                currentClassHash.current = doc.id;
                                setHash(doc.id);
                              }  
                            } else {
                              console.log('no hash found!')
                            }
                          })
                        })
                        data.current = [...snap.data().dates, ...snap.data().messages];
                            [...snap.data().dates, ...snap.data().messages].forEach((element)=>{
                                if(timestamps.current.length < [...snap.data().dates, ...snap.data().messages].length)
                                timestamps.current = [...timestamps.current, element.timestamp]
                            })
                        let copy = timestamps.current;
                        copy.sort();
                        timestamps.current = copy;
                        timestamps.current.forEach((element,index)=>{
                            data.current.forEach(i => {
                                if(i.timestamp === element && sortedData.current.length < data.current.length) {
                                    sortedData.current.push(i);
                                }
                            })
                        })
                        // data.current.forEach((element,index)=>{
                        //     console.log(element.timestamp,timestamps.current[index])
                        //     for(let i=0; i<data.current.length; i++) {
                        //         if(element.timestamp === timestamps.current[i] && sortedData.current.length < data.current.length) {
                        //             // sortedData.current = [...sortedData.current, element]
                        //             sortedData.current.push(element);
                        //         }

                        //     }
                        // })
                        
                      }
                    setSortedData2(prevSortedData2 => sortedData.current)
                    // setSortedData2(prevSortedData2 => sortedData.current.slice(0).reverse().filter(element => element.classHash === currentClassHash.current))
                  }) 


                

                } 
            })
        }
        getData()
    },[]);


    return (
        <>
            <NavbarProf/>

            <Button variant="contained" color="secondary" onClick={()=>console.log(data.current)}>
                Secondary
            </Button>

            <Button variant="contained" color="secondary" onClick={()=>console.log(sortedData2)}>
                hash
            </Button>

            {/* <div style={{backgroundColor: "pink"}}>
                <form action="/upload" method="POST" enctype="multipart/form-data">
                    <input type="file" name="file" id="file"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div> */}
            <h1 style={{color:"white", textAlign: "center", paddingTop: "50px"}}>This is the feed page for {state.name}</h1>
            <NewPost name={state.name} data={firebaseData}/>


            {/* {
                sortedData2.length !==0 ? 
                sortedData2.slice(0).reverse().map((element) => {
                    return(<GeneralCard info={element}/>)
                }) 
                : 
                <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>
            } */}
            {
                sortedData2.length !==0 ? 
                sortedData2.slice(0).reverse().filter((el)=>el.classHash === hash ).map((element)=>{
                    return(<GeneralCard info={element}/>)
                }) 
                : 
                <h1 style={{color:"white", display: "flex", justifyContent: "center", verticalAlign: "middle", paddingTop: 30}}>loading...</h1>
            }
        </>
    )
}