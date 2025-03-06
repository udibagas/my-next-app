import Todo from "@/app/models/Todo";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const userId = req.cookies.get("userId")?.value;
  const todo = await Todo.findById(id);

  if (todo?.userId.toString() !== userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Todo.remove(id);
  revalidatePath("/api/todos");
  return Response.json({ message: "Todo deleted" }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = req.cookies.get("userId")?.value;
  const todo = await Todo.findById(id);

  if (todo?.userId.toString() !== userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await Todo.updateStatus(id);
  revalidatePath("/api/todos");
  return Response.json({ message: "Todo updated" }, { status: 200 });
}
