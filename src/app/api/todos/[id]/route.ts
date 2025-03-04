import Todo from "@/app/models/Todo";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await Todo.remove(id);
  return Response.json({ message: "Todo deleted" }, { status: 200 });
}

export async function PUT(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await Todo.updateStatus(id);
  return Response.json({ message: "Todo updated" }, { status: 200 });
}
