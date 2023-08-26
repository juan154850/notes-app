const { Router } = require("express");
const {
  CategoryController,
} = require("../controllers/categories.controller.js");

const router = Router();

router.get("/categories", CategoryController.getCategories);
router.post("/categories", CategoryController.createCategory);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);
router.get("/categories/:id", CategoryController.getCategory);

module.exports = router;
