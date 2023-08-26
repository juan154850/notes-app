const Router = require("express");
const { NoteController } = require("../controllers/notes.controller.js");

const router = Router();

router.get("/notes", NoteController.getNotes);
router.post("/notes", NoteController.createNote);
router.put("/notes/:id", NoteController.updateNote);
router.delete("/notes/:id", NoteController.deleteNote);
router.get("/notes/:id", NoteController.getNote);

module.exports = router;
