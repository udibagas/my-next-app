import Todo from "@/app/models/Todo";

export default async function TodoPage() {
  const todos = await Todo.findAll()
  console.log(todos)

  return (
    <div className="w-2/3 my-8 m-auto">
      <h1 className="text-3xl">Todos</h1>
    </div>
  );
}