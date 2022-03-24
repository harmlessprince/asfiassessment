const { Sequelize } = require("sequelize");
require("dotenv").config();
// Option 3: Passing parameters separately (other dialects)
const database = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: process.env.DB_CONNECTION,
  }
);

async function testDatabase() {
  try {
    await database.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabase();

module.exports = database;
