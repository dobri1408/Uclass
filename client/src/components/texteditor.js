import React from 'react'
import "quill/dist/quill.snow.css";
import Quill from 'quill'
import {useEffect} from 'react';
import {useRef, useCallback} from 'react';
import './texteditor.css';
import {io} from 'socket.io-client';
import {useState} from 'react';
import { useParams } from "react-router-dom";
import {db} from '../components/firebase/firebase';
import AutoLinks from 'quill-auto-links';
import 'highlight.js/styles/darcula.css';
import QuillCursors from 'quill-cursors';
import hljs from 'highlight.js'
const SAVE_INTERVAL_MS = 2000;

Quill.register('modules/autoLinks', AutoLinks);
 var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [ 'link', 'image', 'video', 'formula' ],          // add's image support
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

  
export default function TextEditor() {
const [socket, setSocket]=useState();
const [quill, setQuill] = useState();
const { id: documentId } = useParams()
const [time,settime] = useState(0);

hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'rust','cpp'],
})

console.log(documentId);

useEffect(() => {
    const s = io("http://188.166.119.126:3001");
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      console.log(document)
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])
  useEffect(() => {
    if (socket == null || quill == null) return


    const handler = delta => {
      quill.updateContents(delta)
      console.log(delta);      
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])
 
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      console.log("INTRU");
      socket.emit("save-document", quill.getContents())
   
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])
 const wrapperRef=   useCallback(wrapper => {
    if(wrapper == null) return; 
    wrapper.innerHTML="";
        const editor = document.createElement("div");
        wrapper.append(editor);
       const q =  new Quill(editor, {theme:"snow",  modules: {
            toolbar: toolbarOptions,
            autoLinks: true,

            syntax: {
              highlight: text => hljs.highlightAuto(text).value,
            },
          }})
          q.disable();
          q.setText("Se incarca..");
          setQuill(q)

    },[])
    return   <div className = "contt" ref = {wrapperRef}>  </div>
    
}
