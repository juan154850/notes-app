const app = require("./app.js");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  try {
    const port = 3000;
    const password = process.env.DATABASE_PASSWORD;
    const username = process.env.DATABASE_USERNAME;
    const database = process.env.DATABASE_NAME;
    const sequelize = new Sequelize(database, username, password, {
      host: "localhost",
      dialect: "postgres",
    });
    await sequelize.authenticate();    
    app.listen(port);
    console.log("Connection has been established successfully.");
    console.log("Server listening on port: ", port);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
