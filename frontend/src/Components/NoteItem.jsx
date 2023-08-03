import React from "react";
import "../Styles/NoteItem.css";
import deleteIcon from "../assets/recycle-bin.png";
import editIcon from "../assets/editar-texto.png";
import archiveIcon from "../assets/archivar.png";
import unarchiveIcon from "../assets/unarchiveIcon.png";
import noteIcon from "../assets/note.png";

const NoteItem = ({ title, lastEdited, onDelete, onEdit, onArchiveClick, isArchived }) => {
  const date = new Date(lastEdited);
  // Get the day, month and year of the date object
  const day = date.getDate();
  const monthAbbr = date.toLocaleString("default", { month: "short" });
  const monthAbbrCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);
  const year = date.getFullYear();

  // Format the date in the format "day/month/year" with the abbreviated month
  const formattedDate = `${day}/${monthAbbrCapitalized}/${year}`;

  return (
    <li className="NoteItem">
      <div className="NoteItem-left">
        {/* Icono General de la nota */}
        <img src={noteIcon} alt="note" className="NoteItem-noteIcon" />
        <div className="NoteItem-content">
          <h3>{title}</h3>
          <span>
            <b>Last edited:</b> {formattedDate}
          </span>
        </div>
      </div>
      <div className="NoteItem-right">
        {/* Show the archive or unarchive button depending on the status of the note */}
        {isArchived ? (
          <img src={unarchiveIcon} alt="Unarchive" className="NoteItem-deleteIcon" onClick={onArchiveClick} />
        ) : (
          <img src={archiveIcon} alt="Archive" className="NoteItem-deleteIcon" onClick={onArchiveClick} />
        )}
        <img src={editIcon} alt="Edit" className="NoteItem-deleteIcon" onClick={onEdit} />
        <img src={deleteIcon} alt="Delete" className="NoteItem-deleteIcon" onClick={onDelete} />
      </div>
    </li>
  );
};

export { NoteItem };

