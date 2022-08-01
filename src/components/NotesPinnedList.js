import React from 'react';
import { Card } from '@mui/material';
import pinIcon from "../assets/thumbtacks.png"
import "./NotesPinnedList.css"
function NotesPinnedList(props) {
    return (
        <div>
            <Card key={props.id} onClick={() => {
                props.setIsDialog2(true)
            }} className='notes-list'>
                <h1>{props.item_title}</h1>
                <hr />
                <p>{props.item_tagline}</p>
                <div className='item-body'>
                    <p >{props.item_body}</p>
                </div>
                <button className='pin-btn' onClick={(e) => {
                    e.stopPropagation()
                    props.pinnnedList.splice(props.id, 1);
                    props.setNotesArray((prev) => [...prev, { body: props.item_body, title: props.item_title, tagline: props.item_tagline }])
                }}>
                    < img className="icon-img" src={`${pinIcon}`} alt="delete-img"></img>

                </button>
            </Card>

        </div>
    );
}

export default NotesPinnedList;