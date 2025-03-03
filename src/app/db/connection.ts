import { Sequelize } from "sequelize";
import pg from "pg";

const sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  database: "next_js",
  username: "postgres",
  password: "postgres",
  dialect: "postgres",
  dialectModule: pg,
});

export default sequelize;
