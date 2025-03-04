import { db } from "@/app/db/mongo";
import { ObjectId } from "mongodb";

interface TodoType {
  _id?: ObjectId;
  title: string;
  deadline: Date;
  status: boolean;
}

const collection = db.collection<TodoType>("todos");

class Todo {
  static async findAll() {
    const todos = await collection.find().toArray();
    return todos;
  }
}

export default Todo;
