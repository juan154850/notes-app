import React from 'react';
import '../Styles/CreateNoteButton.css'
import { NoteContext } from './NoteContext';

const CreateNoteButton = () => {

    const { setOpenModal, openModal } = React.useContext(NoteContext);

    return (
        <button className="CreateNoteButton" onClick={() => {
            setOpenModal(!openModal)
        }}> Create note </button>
    );
}

export {CreateNoteButton}