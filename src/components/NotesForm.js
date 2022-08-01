import React from 'react';
import "./NotesForm.css"

function NotesForm(props) {
    return (
        <div>
            <form onSubmit={props.createNote}>

                <span className='notes-form'>
                    <input required placeholder='Enter Note Title..' value={props.notesTitle} type="text" className='notes-input' onChange={(e) => { props.setNotesTitle(e.target.value) }}></input>
                    <textarea required placeholder='Take Note..' value={props.notesBody} style={{ height: "200px" }} type="text" className='notes-input' onChange={(e) => { props.setNotesBody(e.target.value) }}></textarea>
                    <input required placeholder='Enter A tag Line..' value={props.notesTagline} type="text" className='notes-input' onChange={(e) => { props.setNotesTagline(e.target.value) }} ></input>
                    <button className='create-notes'>Create Note </button>
                </span>
            </form>

        </div>
    );
}

export default NotesForm;