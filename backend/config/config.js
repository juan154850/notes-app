const dotenv = require("dotenv");
dotenv.config();

// const path = require("path");

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "postgres",
    port: "5432",
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "postgres",
    port: "5432",
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: "localhost",
    dialect: "postgres",
    port: "5432",
  },
};
