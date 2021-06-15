import {
    faArrowsAltH,
    faEraser,
    faMagic,
    faPaintBrush,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React from "react";

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
    setCurrentSaturation,
    setCurrentLightness,
    isRegularMode,
    isAutoWidth,
    isEraser,

}) => {
   return (
       <div className ="tablaboard">
    <aside>
    <div>
      <div className="tool-section tool-section--lrg">
        <div className="tool-section">
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
            className={`btn btn--tool ${
              isRegularMode && !isEraser ? "btn--active" : ""
            }`}
            onClick={handleRegularMode}
          >
            <FontAwesomeIcon icon={faPaintBrush} />
          </button>
        </div>
     
        <div>
          <button
            className={`btn btn--tool ${
              isEraser ? "btn--eraser-active" : ""
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
        </div>
      )}
     
    </div>
    <div>
      <a
        className="btn btn--main btn--block"
        download="image.png"
        onClick={handleDownload}
        href={dateUrl}
      >
        Save Image
      </a>
      
    </div>
  </aside>
  </div>
   ) 
}