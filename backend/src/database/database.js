const Sequelize = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const password = process.env.DATABASE_PASSWORD;
const username = process.env.DATABASE_USERNAME;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "postgres",
});

module.exports = { sequelize };
