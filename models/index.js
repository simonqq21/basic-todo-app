import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize(
  "postgres://postgres:KlSr8xhU@localhost:5432/notes_dev",
  { define: { freezeTableName: true } }
);
try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
var generate_tables = false;
if (generate_tables) {
  await sequelize.sync({ force: false });
  console.log("All models were synchronized successfully.");
}
import NoteModel from "./note.js";
export const Note = NoteModel(sequelize, DataTypes);
// const Note = sequelize.define("Note", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   created_at_ts: { type: DataTypes.BIGINT },
//   updated_at_ts: { type: DataTypes.BIGINT },
//   written_by: { type: DataTypes.STRING },
//   title: { type: DataTypes.STRING },
//   body: { type: DataTypes.STRING },
//   completed: { type: DataTypes.BOOLEAN },
// });
// class Note extends Model {}
// Note.init(
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     created_at_ts: { type: DataTypes.BIGINT },
//     updated_at_ts: { type: DataTypes.BIGINT },
//     written_by: { type: DataTypes.STRING },
//     title: { type: DataTypes.STRING },
//     body: { type: DataTypes.STRING },
//     completed: { type: DataTypes.BOOLEAN },
//   },
//   { sequelize, modelName: "Note" }
// );
export { Sequelize, sequelize };
