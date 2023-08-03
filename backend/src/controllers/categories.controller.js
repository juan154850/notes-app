const Category = require("../../models/categories.js");

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll();
    res.json(allCategories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    //get the category from the dataBase
    const { id } = req.params;
    const searchedCategory = await Category.findByPk(id);

    //validation in case the desired note does not exist.
    if (!searchedCategory) return res.status(404).json({ message: "The searched category does not exist." });

    res.json(searchedCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    // The body of the petition cannot be empty.
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "The body of the request cannot be empty." });
    }

    const { title } = req.body;
    //we validate if the category exists, if so, we do not create it.
    const searchedCategory = await Category.findOne({
      where: { title: title.toLowerCase() },
    });
    if (!searchedCategory) {
      const newCategory = await Category.create({
        title: title.toLowerCase(),
      });
      res.status(201).json(newCategory);
    } else {
      return res.status(204).json({ message: "This category already exists." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    //get the category from the dataBase.
    const { id } = req.params;
    const { title } = req.body;
    const searchedCategory = await Category.findByPk(id);

    //validation in case the desired category does not exist.
    if (!searchedCategory) return res.status(404).json({ message: "The searched category does not exist." });

    //modify the category.
    searchedCategory.title = title.toLowerCase();

    //save the changes.
    await searchedCategory.save();
    res.status(200).json(searchedCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    //validation in case the desired category does not exist.
    const searchedCategory = await Category.findByPk(id);
    if (!searchedCategory) return res.status(404).json({ message: "The searched category does not exist." });

    await Category.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(202);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
