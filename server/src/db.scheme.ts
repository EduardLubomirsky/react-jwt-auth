import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "auth/user.service";
import { ValueModel } from "values/value.service";
import { ShowModel } from "show/show.service";
export const sequelize = new Sequelize("test", "root", "root", {
  dialect: "mysql",
});
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: DataTypes.STRING,
    fullName: DataTypes.STRING,
    password: DataTypes.STRING
  },
  { sequelize, modelName: "user" }
);
ValueModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: DataTypes.TEXT
  },
  { sequelize, modelName: "value" }
);
ShowModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.TEXT,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
  },
  { sequelize, modelName: "shows" }
);
