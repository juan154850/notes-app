"use strict";
const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../database/database.js");
class Category extends Model {
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
      return await Category.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOne({ id }) {
    try {
      const searchedCategory = await Category.findByPk(id);
      if (!searchedCategory) {
        throw new Error("The searched category does not exist.");
      }
      return searchedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createCategory({ title }) {
    try {
      const searchedCategory = await Category.findOne({
        where: { title: title.toLowerCase() },
      });
      if (!searchedCategory) {
        const newCategory = await Category.create({
          title: title.toLowerCase(),
        });
        return newCategory;
      } else {
        throw new Error("This category already exists.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async update({ id, title }) {
    try {
      const searchedCategory = await Category.findByPk(id);
      //validation in case the desired category does not exist.
      if (!searchedCategory) {
        throw new Error("The searched category does not exist.");
      }
      //modify the category.
      searchedCategory.title = title.toLowerCase();
      //save the changes.
      await searchedCategory.save();
      return searchedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async delete({ id }) {
    try {
      const searchedCategory = await Category.findByPk(id);
      if (!searchedCategory) {
        throw new Error("The searched category does not exist.");
      }
      await Category.destroy({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

Category.init(
  {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [1, 20],
      },
    },
  },
  {
    sequelize,
    modelName: "Category",
  }
);

module.exports = Category;
