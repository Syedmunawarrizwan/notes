import "./Header.css"
import React from 'react';
import Notes from "../assets/notes.png"

function Header(props) {
    return (
        <div className="header">
            <img className="notes-1" src={`${Notes}`} alt="notes"></img>

            <h1>Notes  </h1>
            <img className="notes-1" src={`${Notes}`} alt="notes"></img>

        </div>
    );
}

export default Header;