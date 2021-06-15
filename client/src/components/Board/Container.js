import  React from 'react';
import Board from './Board';
import './container.css';
import {Toolbar} from './Toolbar';
import './board.css';
function Container(){

        return (
            <div className="containerBoard">
              
                <div className="board-container">
                           
                            <Board/>
                        </div>
            </div>
        )    }

export default  Container;