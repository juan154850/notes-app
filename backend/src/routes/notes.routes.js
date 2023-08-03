const Router = require("express");
const { createNote, deleteNote, getNote, getNotes, updateNote } = require("../controllers/notes.controller.js");

const router = Router();

router.get("/notes", getNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.get("/notes/:id", getNote);

module.exports = router;
