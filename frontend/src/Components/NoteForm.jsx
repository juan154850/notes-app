import React, { useContext, useState, useEffect } from "react";
import "../Styles/NoteForm.css";
import { NoteContext } from "./NoteContext";
import iconFiel from "../assets/icon-field.png";
import deleteIconCategory from "../assets/delete-category-icon.png";
import { CategoriesContext } from "./CategoriesContext";

const NoteForm = ({ isEditing, editNoteId }) => {
  const { setOpenModal, addNote, updateNote, notes, setEditingNote } = useContext(NoteContext);
  const { categories, createCategoryOnDB } = useContext(CategoriesContext);

  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNoteCategories, setNewNoteCategories] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (isEditing) {
      // If we are editing a note, we call the updateNote function
      updateNote(editNoteId, newNoteTitle, newNoteContent, newNoteCategories);
    } else {
      // If we are creating a new note, we call the addNote function
      addNote(newNoteTitle, newNoteContent);
    }

    // Close the modal after saving the edit or adding a new note
    setOpenModal(false);
    setEditingNote(null);
  };

  const onChangeTitle = (event) => {
    setNewNoteTitle(event.target.value);
  };

  const onChangeContent = (event) => {
    setNewNoteContent(event.target.value);
  };

  const onChangeCategory = (event) => {
    setNewCategory(event.target.value);
  };

  const createCategory = (event) => {
    event.preventDefault();
    if (!newNoteCategories.includes(newCategory)) {
      // Se crea la categoría en base de datos para que la toma tomar en una siguiente validación.
      createCategoryOnDB(newCategory);
      const newCategories = newNoteCategories.push(newCategory);
      setNewCategory("");
      setNewNoteCategories(newCategories);
      updateNote(editNoteId, newNoteTitle, newNoteContent, newNoteCategories);
    } else {
      setNewCategory("");
    }
  };

  const deleteCategory = (event) => {
    event.preventDefault();
    const category = event.target.className.split(`category-`).pop();
    const categoryIndex = newNoteCategories.indexOf(category);
    setNewNoteCategories(newNoteCategories.splice(categoryIndex, 1));
    updateNote(editNoteId, newNoteTitle, newNoteContent, newNoteCategories);
  };

  // useEffect to set the values if editing a note
  useEffect(() => {
    if (isEditing && editNoteId) {
      const noteToEdit = notes.find((note) => note.id === editNoteId);
      if (noteToEdit) {
        setNewNoteTitle(noteToEdit.title);
        setNewNoteContent(noteToEdit.description);
        setNewNoteCategories(noteToEdit.categories);
      }
    }
  }, [isEditing, editNoteId, notes, createCategory]);

  return (
    <form onSubmit={onSubmit}>
      <label>
        {" "}
        <h2>Create / Edit note</h2>{" "}
      </label>
      <br />
      <label>
        Title:
        <input type="text" name="title" value={newNoteTitle} onChange={onChangeTitle} required />
      </label>
      <label>
        Content:
        <textarea placeholder="Write your new content note here." value={newNoteContent} onChange={onChangeContent}></textarea>
      </label>
      {newNoteCategories.length > 0 ? (
        <label>
          Categories:
          <div className="Container-categories">
            {newNoteCategories.map((category) => (
              <div className="Categories" key={`${category}-div-container`}>
                <img src={iconFiel} alt="iconCategory" className="Icon-category" />
                <span className="Category-text" key={category}>
                  {category}
                </span>
                <img
                  src={deleteIconCategory}
                  alt="iconDeleteCategory"
                  className={`Icon-category Icon-category-delete category-${category}`}
                  onClick={deleteCategory}
                />
              </div>
            ))}
          </div>
        </label>
      ) : (
        ""
      )}
      <div className="Create-categories">
        <input
          type="text"
          name="category-name"
          className="Category-name"
          placeholder="Write your new category here"
          onChange={onChangeCategory}
          value={newCategory}
        />
        {newCategory.length === 0 ? (
          <button className="Add-category-button" onClick={createCategory} disabled>
            Add
          </button>
        ) : (
          <button className="Add-category-button" onClick={createCategory}>
            Add
          </button>
        )}
      </div>

      <div className="NoteForm-buttonContainer" type="button">
        <button
          className="NoteForm-button NoteForm-cancel"
          onClick={() => {
            setEditingNote(null);
            setOpenModal(false);
          }}>
          Cancel
        </button>
        <button className="NoteForm-button NoteForm-button--add" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export { NoteForm };