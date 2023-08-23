const { Sequelize } = require("sequelize");
const Note = require("../../models/notes.js");

const getNotes = async (req, res) => {
  try {
    const allNotes = await Note.getAll();
    res.json(allNotes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const searchedNote = await Note.getBy({ id });
    res.json(searchedNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newNote = await Note.createNote({ title, description });
    res.json(newNote).status(201);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {return res.status(400).json({ message: "The body of the request cannot be empty." });}
    const { id } = req.params;    
    const searchedNote = await Note.updateNote({ id, ...req.body });
    res.status(200).json(searchedNote);
  }
  catch (error) {
    if (error instanceof Sequelize.ValidationError) {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({ message: errorMessages });
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    await Note.deleteNote({ id });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNote, getNotes, updateNote, createNote, deleteNote };
