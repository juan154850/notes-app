const { Router } = require("express");
const { createCategory, deleteCategory, getCategories, getCategory, updateCategory } = require("../controllers/categories.controller.js");

const router = Router();

router.get("/categories", getCategories);
router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);
router.get("/categories/:id", getCategory);

module.exports = router;
