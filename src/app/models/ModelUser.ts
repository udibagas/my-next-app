import { ObjectId } from "mongodb";
import { db } from "../db/mongo";
import bcrypt from "bcrypt";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string;
}

const collection = db.collection<User>("users");
collection.createIndex({ email: 1 }, { unique: true });

class ModelUser {
  static async create(user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    const result = await collection.insertOne(user);
    const newUser = await collection.findOne({ _id: result.insertedId });
    return newUser;
  }

  static async findAll() {
    const users = await collection.find().toArray();
    return users;
  }

  static async findByEmail(email: string) {
    const user = await collection.findOne({ email });
    return user;
  }
}

export default ModelUser;
