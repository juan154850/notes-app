const express = require("express");
const cors = require("cors");
const notesRoutes = require("./routes/notes.routes.js");
const categoriesRoutes = require("./routes/categories.routes.js");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(notesRoutes);
app.use(categoriesRoutes);

module.exports = app;
