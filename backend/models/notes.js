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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],        
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
