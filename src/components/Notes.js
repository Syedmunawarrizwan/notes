import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';

import { db } from "../firebase-config";
import { doc } from "firebase/firestore";
import deleteIcon from "../assets/delete.png"
import pinIcon from "../assets/thumbtacks.png"
import Card from '@mui/material/Card';
import "./Notes.css"
import NotesPagination from './NotesPagination';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { async } from '@firebase/util';
import NotesPinnedList from './NotesPinnedList';
import NotesForm from './NotesForm';
function Notes(props) {
    const [notesTitle, setNotesTitle] = useState("");
    const [notesTagline, setNotesTagline] = useState("");
    const [notesBody, setNotesBody] = useState("");
    const [notesArray, setNotesArray] = useState([])
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(6);
    const [loader, setLoader] = useState(false);
    const [pinnnedList, setPinnedList] = useState([])
    const [isPinned, setIsPinned] = useState(false)


    const [editNotesBody, setEditNotesBody] = useState("");
    const [editNotesTitle, setEditNotesTitle] = useState("");
    const [editNotesTagLine, setEditNotesTagLine] = useState("");
    const [isDialog, setIsDialog] = useState(false);
    const [isDialog2, setIsDialog2] = useState(false);
    const [id, setId] = useState("");


    const indexOfLastnote = currentPage * notesPerPage;
    const indexOfFirstnote = indexOfLastnote - notesPerPage;
    const currentnotes = notesArray.slice(indexOfFirstnote, indexOfLastnote);
    console.log(pinnnedList)
    console.log(notesArray)


    const getData = async () => {
        setLoader(true)
        const userCollectionRef = collection(db, "notes");
        const data = await getDocs(userCollectionRef);
        setNotesArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoader(false)
    };

    useEffect(() => {
        getData();


    }, [])


    const addButtonHandler = () => {
        setIsDisplayForm(true)
    }
    const paginate = pageNumber => setCurrentPage(pageNumber);


    const createNote = async (e) => {
        setLoader(true)
        e.preventDefault();

        const userCollectionRef = collection(db, "notes");
        await addDoc(userCollectionRef, { body: notesBody, title: notesTitle, tagline: notesTagline });
        const data = await getDocs(userCollectionRef);

        setNotesArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setNotesTagline("");
        setNotesBody("");
        setNotesTitle("")
        console.log(notesArray)
        setIsDisplayForm(false)
        setLoader(false)

    };
    const editNote = async (id) => {
        setLoader(true)
        setIsDialog(false)
        const userCollectionRef = collection(db, "notes");
        const userdoc = doc(db, "notes", id);
        await updateDoc(userdoc, { body: editNotesBody, title: editNotesTitle, tagline: editNotesTagLine });
        const data = await getDocs(userCollectionRef);
        setNotesArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoader(false)



    }
    const UpdateNotes = (item) => {
        setEditNotesBody(item.body)
        setEditNotesTagLine(item.tagline)
        setEditNotesTitle(item.title);
        setId(item.id);

    }
    const DeleteNote = async (id) => {
        setLoader(true)
        const userCollectionRef = collection(db, "notes");
        const userdoc = doc(db, "notes", id);
        await deleteDoc(userdoc);
        const data = await getDocs(userCollectionRef);

        setNotesArray(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoader(false)
    };
    return (
        <div className='notesform-container'>

            {isPinned && <div className='notes-container'>
                <h1>PinnnedList</h1>
                {pinnnedList.map((item, id) => {
                    return (
                        <>

                            <NotesPinnedList
                                id={id}
                                setIsDialog2={setIsDialog2}
                                item_title={item.title}
                                item_body={item.body}
                                item_tagline={item.tagline}
                                setNotesArray={setNotesArray}
                                pinnnedList={pinnnedList}
                            ></NotesPinnedList>


                        </>
                    )
                })}

            </div>}

            <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }} >

                {loader && <div>

                    <CircularProgress width="200px" disableShrink />
                </div>
                }
            </div>
            <div style={{ "margin-top": "30px", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>

                {!isDisplayForm && <Button className='add-btn' onClick={addButtonHandler} variant="contained" color="success" >Add Note </Button>}
            </div >
            {isPinned && <h1>UnpinnedList</h1>}

            {
                isDisplayForm &&

                <NotesForm
                    createNote={createNote}
                    notesTitle={notesTitle}
                    setNotesTitle={setNotesTitle}
                    notesBody={notesBody}
                    notesTagline={notesTagline}
                    setNotesBody={setNotesBody}
                    setNotesTagline={setNotesTagline}
                ></NotesForm>
            }

            <div className='notes-container'>
                {currentnotes.map((item, id) => {
                    return (


                        <Card key={id} className='notes-list' onClick={(e) => {
                            UpdateNotes(item)
                            setIsDialog(true)
                            // editNote(item);
                        }} >
                            <div style={{ "display": "flex", "alignItems": "center", "justifyContent": "space-between" }}>


                                <h1>{item.title}</h1>

                                <div>

                                    <button className='pin-btn' onClick={
                                        (e, index) => {
                                            setPinnedList((prev) => {
                                                return [...prev, { title: item.title, body: item.body, tagline: item.tagline }]
                                            })
                                            setIsPinned(true);
                                            notesArray.splice(id, 1);
                                            e.stopPropagation()


                                        }
                                    }>< img className="icon-img" src={`${pinIcon}`} alt="delete-img"></img></button>
                                    <button className='delete-btn' onClick={(e) => {
                                        e.stopPropagation()

                                        DeleteNote(item.id)
                                    }}>< img className="icon-img" src={`${deleteIcon}`} alt="delete-img"></img></button>
                                </div>
                            </div>
                            <hr />
                            <h4>{item.tagline}</h4>
                            <hr />
                            <div className='item-body'>
                                <p >{item.body}</p>
                            </div>

                        </Card>
                    )
                })}
            </div>
            {isDialog && <Dialog className='' open={isDialog} onClose={isDialog}>
                <Card className="dialog-box" style={{ "width": "350px", "height": "350px" }}>
                    <input type="text" className='modal-input' value={editNotesTitle} onChange={(e) => { setEditNotesTitle(e.target.value) }}></input>
                    <input type="text" className='modal-input' value={editNotesTagLine} onChange={(e) => {
                        setEditNotesTagLine(e.target.value)
                    }}></input>
                    <textarea className='modal-textarea' type="text" value={editNotesBody} onChange={(e) => {
                        setEditNotesBody(e.target.value)

                    }} ></textarea>
                    <button className='save-btn' onClick={editNote.bind(null, id)}>Save</button>
                </Card>


            </Dialog>}
            {isDialog2 && <Dialog open={isDialog2} onClose={isDialog2}>

                <div className="dialog-box-2" style={{ "width": "350px", "height": "350px" }} >

                    <h1>You Need To Upin It for Updating value</h1>
                    <button className='close-btn' onClick={() => {
                        setIsDialog2(false)
                    }} >Close</button>

                </div>

            </Dialog>}

            <NotesPagination notesPerPage={notesPerPage} totalNotes={notesArray.length} paginate={paginate}  ></NotesPagination>
        </div >
    );
}

export default Notes;