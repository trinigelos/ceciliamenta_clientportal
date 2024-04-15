//Header.jsx
import React from 'react'
import "./Header.css";
import logoCeciliaMenta from "../static/logoCeciliaMenta.png"

export const Header = () => {
  return (
      <div className='header-container'>
        <div className="header-img">
              <img src={logoCeciliaMenta} alt="" />
        </div>
        {/* <div className="header-items">
        <h1>Contacto</h1>
        </div> */}
    </div>
  )
}
