import  React from 'react';
import {Board} from './Board';
import './container.css';
import {Toolbar} from './Toolbar';
import './board.css';
import {useState} from 'react';
import NavbarProf from '../NavbarProf';
import {Button} from 'react-bootstrap'
function Container(){

var pages = new Array();
pages.push(<Board page={0}/>) 
const [currentPage, setCurrentPage] = useState(0);
const [boards, setBoards ] = useState(pages);

const newPage = () =>{
   
  
    

}
console.log(boards);
return (
        <>
      
        <Board/>

          </>        
         
    )
    }
   
export default  Container;