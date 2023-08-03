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
}
Note.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    categories: DataTypes.ARRAY(DataTypes.STRING),
    is_archived: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Note",
  },
);

module.exports =  Note 
