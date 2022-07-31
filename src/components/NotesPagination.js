import React from 'react';
import "./NotesPagination.css"

const Notes = ({ notesPerPage, totalNotes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            {pageNumbers.map(number => (
                <div onClick={() => paginate(number)} key={number} className='page-item'>


                    <p onClick={() => paginate(number)} className='page-link'>
                        {number}
                    </p>
                </div>
            ))
            }

        </nav >
    );
};

export default Notes;