import React from "react";
import ReactDom from "react-dom";
import "../Styles/Modal.css";
import { NoteContext } from "./NoteContext";

const Modal = ({ children }) => {
  const { openModal } = React.useContext(NoteContext);
  return ReactDom.createPortal(
    <div className={`modal-container ${openModal && "active"}`}>
      <div className="modal">{children}</div>
    </div>,
    document.getElementById(`modal`),
  );
};

export { Modal };
