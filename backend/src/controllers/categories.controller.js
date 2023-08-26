const Category = require("../../models/categories.js");

class CategoryController {
  static getCategories = async (req, res) => {
    try {
      const allCategories = await Category.getAll();
      res.json(allCategories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const searchedCategory = await Category.getOne({ id });
      if (!searchedCategory) {
        res.status(404).send();
      }
      res.json(searchedCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static createCategory = async (req, res) => {
    try {
      // The body of the petition cannot be empty.
      if (Object.keys(req.body).length === 0) {
        return res
          .status(400)
          .json({ message: "The body of the request cannot be empty." });
      }

      const { title } = req.body;
      const newCategory = await Category.createCategory({ title });
      res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static updateCategory = async (req, res) => {
    try {
      //get the category from the dataBase.
      const { id } = req.params;
      const { title } = req.body;
      const searchedCategory = await Category.update({ id, title });
      res.status(200).json(searchedCategory);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      await Category.delete({ id });
      res.sendStatus(202);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = { CategoryController };
