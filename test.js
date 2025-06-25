// const { Sequelize } = require("sequelize");
// const { Sequelize, DataTypes, Model } = require("sequelize");
import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize(
  "postgres://postgres:KlSr8xhU@localhost:5432/notes_dev"
);
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
