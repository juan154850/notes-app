import React, { useContext, useState } from "react";
import { NoteList } from "../Components/NoteList.jsx";
import { NoteItem } from "../Components/NoteItem.jsx";
import { NoteContext } from "../Components/NoteContext.jsx";
import { CreateNoteButton } from "../Components/CreateNoteButton.jsx";
import { Modal } from "../Components/Modal.jsx";
import { NoteForm } from "../Components/NoteForm.jsx";
import { CategoryList } from "../Components/CategoryList.jsx";
import "../Styles/AppUi.css";
import { CategoriesContext } from "../Components/CategoriesContext.jsx";

const AppUI = () => {
  const { notes, openModal, deleteNote, handleEditNote, editingNote, archiveNote, unarchiveNote } = useContext(NoteContext);
  const { categories } = useContext(CategoriesContext);
  const [showArchivedNotes, setShowArchivedNotes] = useState(false); // New status to control archived notes

  // Filter notes according to showArchivedNotes status
  const filteredNotes = showArchivedNotes ? notes.filter((note) => note.is_archived) : notes.filter((note) => !note.is_archived);
  return (
    <>
      <div className="Container">
        <h2>{!showArchivedNotes ? "My notes" : "Archived notes"}</h2>
        <div className="ButtonsContainer">
          <CreateNoteButton />
          <button className="ShowArchivedNotesButton" onClick={() => setShowArchivedNotes(!showArchivedNotes)}>
            {showArchivedNotes ? "Show Active Notes" : "Show Archived Notes"}
          </button>
        </div>
      </div>
      <CategoryList categories={categories} />
      <NoteList>
        {filteredNotes.length === 0 && showArchivedNotes ? (
          <h2 className="WarningMessage">You have no notes in the archive.</h2>
        ) : filteredNotes.length === 0 && !showArchivedNotes ? (
          <h2 className="WarningMessage">You have no active notes</h2>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              title={note.title}
              lastEdited={note.updatedAt}
              onDelete={() => deleteNote(note.id)}
              onEdit={() => handleEditNote(note.id)}
              onArchiveClick={() => (note.is_archived ? unarchiveNote(note.id) : archiveNote(note.id))} // Call archiveNote or unarchiveNote depending on status
              isArchived={note.is_archived} // Pass the value of is_archived to find out if a note is archived
            />
          ))
        )}
      </NoteList>

      {openModal && (
        <Modal>
          {/* Pass the ID of the note to be edited to the form */}
          <NoteForm isEditing={editingNote !== null} editNoteId={editingNote} />
        </Modal>
      )}
    </>
  );
};

export { AppUI };
