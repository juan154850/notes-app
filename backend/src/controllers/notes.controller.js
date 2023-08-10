const Note = require("../../models/notes.js");

const getNotes = async (req, res) => {
  try {
    const allNotes = await Note.findAll();
    if (allNotes.length > 0) {
      res.json(allNotes);
    } else {
      res.status(404).json({ message: 'No notes found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;

    //get the note from the dataBase
    const searchedNote = await Note.findByPk(id);

    //validation in case the desired note does not exist.
    if (!searchedNote) return res.status(404).json({ message: "The searched note does not exist." });

    //return the note that the user is looking for.
    res.json(searchedNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    // The body of the petition cannot be empty.
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "The body of the request cannot be empty." });
    }
    const { title, description } = req.body;
    // The title and description parameters are mandatory.
    if (!title) {
      return res.status(400).json({ message: "The title parameter are mandatory." });
    }
    const newNote = await Note.create({
      title,
      description,
    });
    res.json(newNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    // The body of the petition cannot be empty.
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "The body of the request cannot be empty." });
    }

    //get the note from the dataBase.
    const { id } = req.params;
    const { title, description, categories, deleted, is_archived } = req.body;
    const searchedNote = await Note.findByPk(id);

    //If the note does not exist, it must be indicated to the user.
    if (!searchedNote) {
      return res
        .status(404)
        .json({ message: "The note with the given id does not exist." });
    }

    //update the note.
    searchedNote.update({
      title: title,
      description: description,
      categories: categories?.map((category) => category.toLowerCase()),
      deleted: deleted,
      is_archived: is_archived,
    });

    //save the changes.
    await searchedNote.save();
    res.status(200).json(searchedNote);
  } catch (error) {
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

    //If the note does not exist, it must be indicated to the user.
    const searchedNote = await Note.findByPk(id);
    if (!searchedNote) {
      return res.status(404).json({ message: "The note with the given id does not exist." });
    }

    await Note.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getNote, getNotes, updateNote, createNote, deleteNote };
