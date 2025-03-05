import { db } from "@/app/db/mongo";
import { TodoType } from "../definitions/formResponse";
import { ObjectId } from "mongodb";

const collection = db.collection<TodoType>("todos");

class Todo {
  static async findAll() {
    const todos = await collection.find().toArray();
    return todos;
  }

  static async findById(id: string) {
    const todo = await collection.findOne({ _id: new ObjectId(id) });
    return todo;
  }

  static async findAllByUserid(userId: string) {
    const todos = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    return todos;
  }

  static async create({ title, deadline, userId }: TodoType) {
    const result = await collection.insertOne({
      title,
      deadline,
      userId: new ObjectId(userId),
      status: false,
    });

    const newTodo = await collection.findOne({ _id: result.insertedId });
    return newTodo;
  }

  static async remove(id: string) {
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  }

  static async updateStatus(id: string) {
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: true } }
    );

    return result;
  }
}

export default Todo;
