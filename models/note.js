// import { Sequelize, DataTypes, Model } from "sequelize";
export default function NoteModel(sequelize, DataTypes) {
  return sequelize.define("Note", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    written_by: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING(200), allowNull: false },
    body: { type: DataTypes.STRING(5000), allowNull: false },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
}
// const Note = sequelize.define("Note", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   created_at_ts: { type: DataTypes.BIGINT },
//   updated_at_ts: { type: DataTypes.BIGINT },
//   written_by: { type: DataTypes.STRING },
//   title: { type: DataTypes.STRING },
//   body: { type: DataTypes.STRING },
//   completed: { type: DataTypes.BOOLEAN },
// });
// export default Note;
