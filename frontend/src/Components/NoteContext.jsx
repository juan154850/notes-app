import React, { useEffect, useState } from "react";

const NoteContext = React.createContext();

const NoteProvider = ({ children }) => {
  //API call to fetch all the notes.
  const [notes, setNotes] = useState([]);

  //get the notes from the API.
  const getNotes = async () => {
    try {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch("http://localhost:3000/notes", {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      setNotes(data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  //create a new note
  const [openModal, setOpenModal] = React.useState(false);
  const addNote = async (title, content) => {
    const createNote = async () => {
      try {
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
          title: title,
          description: content,
        });

        let response = await fetch("http://localhost:3000/notes", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });

        let data = await response.json();
        getNotes();
        return data;
      } catch (error) {
        console.log(error.message);
      }
    };
    createNote();
  };

  //delete notes
  const deleteNote = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this note?");
      if (confirmDelete) {
        let headersList = {
          Accept: "*/*",
        };

        let response = await fetch(`http://localhost:3000/notes/${id}`, {
          method: "DELETE",
          headers: headersList,
        });

        if (response.status === 204) getNotes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Status to manage the edition of a specific note
  const [editingNote, setEditingNote] = useState(null);

  // Function to handle the start of editing
  const handleEditNote = (noteId) => {
    setEditingNote(noteId); // Sets the editingNote state with the ID of the note to be edited
    setOpenModal(true); // Opens the modal to show the edit form
  };

  //update notes
  const updateNote = async (id, title, description, categories) => {
    try {
      let headersList = {
        Accept: "*/*",

        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        title,
        description,
        categories,
      });

      let response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Archive notes
  const archiveNote = async (id) => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        is_archived: true,
      });

      let response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Unarchive notes
  const unarchiveNote = async (id) => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        is_archived: false,
      });

      let response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      });

      if (response.status === 200) getNotes();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        openModal,
        setOpenModal,
        addNote,
        deleteNote,
        updateNote,
        handleEditNote,
        editingNote,
        archiveNote,
        unarchiveNote,
        setEditingNote,
      }}>
      {children}
    </NoteContext.Provider>
  );
};

export { NoteContext, NoteProvider };
