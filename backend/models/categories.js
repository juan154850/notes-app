"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../src/database/database.js");
class Category extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
Category.init(
  {
    title: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Category",
  },
);

module.exports =  Category ;