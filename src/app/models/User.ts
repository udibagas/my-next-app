import pool from "../db/pool";

class User {
  declare id: number;
  declare email: string;
  declare password: string;

  constructor(id: number, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  static async findAll() {
    const result = await pool.query("SELECT * FROM users");
    const users: User[] = result.rows;
    return users;
  }

  static async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(query, [email, password]);
    const user = result.rows[0];
    return new User(user.id, user.email, user.password);
  }
}

export default User;
