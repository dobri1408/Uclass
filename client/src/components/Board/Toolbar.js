import {
  faArrowsAltH,
  faEraser,
  faMagic,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
export const Toolbar = ({
  currentWidth,
  currentColor,
  handleDownload,
  dateUrl,
  handleClear,
  handleSpecialMode,
  handleEraserMode,
  setAutoWidth,
  handleRegularMode,
  handleColor,
  handleWidth,
  realBoardId,
  setCurrentSaturation,
  setCurrentLightness,
  isRegularMode,
  isAutoWidth,
  isEraser,
  page,

}) => {
  let history=useHistory();

  const nextPage = () =>{
    var PAGE = parseInt(page);
    history.push(`/board/${realBoardId}$${PAGE+1}`)
    history.go(0);
  }
  const previousPage = () =>{
    var PAGE = parseInt(page);
   
    history.push(`/board/${realBoardId}$${PAGE-1}`)
    history.go(0);
  }
  
  return (
    <div className="tablaboard">
      <aside>
        <div>
          <div className="tool-section tool-section--lrg">
            <div className="tool-section">
              Page {page}
              <br/>
              <small>
                <strong>Brush color</strong>
              </small>
            </div>
            <input
              className="btn--color"
              type="color"
              id="toolColorPicker"
              onChange={handleColor}
            />
          </div>
          <div className="tool-section">
            <small>
              <strong>Tools</strong>
            </small>
          </div>
          <div className="tool-grid tool-section tool-section--lrg">
            <div>
              <button
                className={`btn btn--tool ${isRegularMode && !isEraser ? "btn--active" : ""
                  }`}
                onClick={handleRegularMode}
              >
                <FontAwesomeIcon icon={faPaintBrush} />
              </button>
            </div>

            <div>
              <button
                className={`btn btn--tool ${isEraser ? "btn--eraser-active" : ""
                  }`}
                onClick={handleEraserMode}
              >
                <FontAwesomeIcon icon={faEraser} />
              </button>
            </div>


          </div>
          {!isAutoWidth && (
            <div className="tool-section tool-section--lrg">
              <div className="tool-section">

                <small>
                  <strong>Brush size</strong>
                </small>
              </div>
              <div className="tool-section">
                <input
                  defaultValue="10"
                  type="range"
                  min="1"
                  max="90"
                  onChange={handleWidth}
                />
              </div>
              <div>
              <button onClick={previousPage}>
               < ArrowBackIcon/>
               </button>
               <button onClick={nextPage}>
            <   ArrowForwardIcon/>
               </button>

               
              </div>
              <div className="tool-section">
                <button>
                
                </button>
              </div>

            </div>

          )}

        </div>
       
      </aside>
    </div>
  )
}