import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../db/connection";

class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id?: CreationOptional<number>;
  declare email: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    tableName: "users",
    sequelize,
    timestamps: false,
  }
);

export default UserModel;
