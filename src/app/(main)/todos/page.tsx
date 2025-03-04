"use client";

import { TodoType } from "@/app/definitions/formResponse";
import { ObjectId } from "mongodb";
import { FormEvent, useEffect, useState } from "react";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  const [error, setError] = useState<{
    title?: string[];
    deadline?: string[];
  }>({})

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(title, deadline)

    fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title, deadline })
    })
      .then(async (res) => {
        const json = await res.json()

        if (!res.ok) {
          throw json
        }

        return json
      })
      .then(data => {
        setTodos([data, ...todos])
        setTitle('')
        setDeadline('')
        setError({})
      })
      .catch(err => {
        console.log(err)
        setError(err)
      })
  }

  function handleDelete(id: ObjectId | undefined) {
    fetch(`http://localhost:3000/api/todos/${id?.toString()}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete')
      }

      fetchTodos()
    }).catch(err => {
      alert(err.message)
      console.log(err)
    })
  }

  function handleUpdate(id: ObjectId | undefined) {
    fetch(`http://localhost:3000/api/todos/${id?.toString()}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete')
      }

      fetchTodos()
    }).catch(err => {
      alert(err.message)
      console.log(err)
    })
  }

  function fetchTodos() {
    fetch("http://localhost:3000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-2/3 my-8 m-auto">
      <h1 className="text-3xl">Todos</h1>

      <form onSubmit={handleSubmit} className="w-[400px] my-8 flex flex-col gap-6">
        <div>
          <label htmlFor="title">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {<div className="text-red-500 tex-sm mt-2">{error.title?.join(", ")}</div>}
        </div>

        <div>
          <label htmlFor="deadline">Date</label>
          <input
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            type="date"
            name="deadline"
            id="deadline"
            placeholder="Title"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {<div className="text-red-500 tex-sm mt-2">{error.deadline?.join(", ")}</div>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md p-2 mt-4"
          >
            Add Todo
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead className="border-b border-gray-300">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Deadline</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {todos.map((todo, i) => (
              <tr key={i}>
                <td className="py-2 px-4 border-b border-gray-300">
                  {todo.title}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {todo.deadline}
                </td>
                <td className="py-2 px-4 border-b border-gray-300">
                  {todo.status ? "Done" : "Not done"}
                </td>
                <td className="text-center">
                  {todo.status && <button onClick={() => handleDelete(todo._id)} className="bg-red-500 text-white py-2 px-4">Delete</button>}
                  {!todo.status && <button onClick={() => handleUpdate(todo._id)} className="bg-green-500 text-white py-2 px-4">Done</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
