"use strict";
const { Model, DataTypes } =  require( "sequelize");
const { sequelize } = require( "../src/database/database.js");

class Note extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }

  static async getAll() {
    try {
      const allNotes = await Note.findAll();
      if (allNotes.length > 0) {
        return allNotes;
      } else {
        throw new Error("No notes found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getBy({ id }) {
    try {
      const searchedNote = await Note.findByPk(id);
      if (!searchedNote) throw new Error("The searched note does not exist.");
      return searchedNote;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createNote({ title, description }) {
    try {
      if (!title) {
        throw new Error("The title of the note cannot be empty.")
      }
      await Note.create({
        title,
        description,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateNote({
    id,
    title,
    description,
    categories,
    deleted,
    is_archived,    
    }){
    try {
      const searchedNote = await Note.findByPk(id);
      if (!searchedNote) {
        throw new Error("The note with the given id does not exist.")
      }
      console.log("searchedNote", searchedNote)
      await searchedNote.update({
        title: title,
        description: description,
        categories: categories?.map((category) => category.toLowerCase()),
        deleted: deleted,
        is_archived: is_archived,
      });      
      await searchedNote.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteNote({ id }){
    try {
      const searchedNote = await Note.findByPk(id);
      if (!searchedNote) {
        throw new Error("The note with the given id does not exist.")}
      await Note.destroy({where: {id},});
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

Note.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        is: /^[A-z0-9]+/g,
      },
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500],
      },
      allowNull: true,
    },
    categories: DataTypes.ARRAY(DataTypes.STRING),
    is_archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Note",
  }
);

module.exports =  Note
