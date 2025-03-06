import Todo from "@/app/models/Todo";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty(),
  deadline: z.string().nonempty(),
});

export async function GET(req: NextRequest) {
  const userId = req.cookies.get("userId")?.value;

  if (!userId) {
    return Response.json([], { status: 200 });
  }

  const todos = await Todo.findAllByUserid(userId!);
  return Response.json(todos, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const vaidationResult = schema.safeParse(data);

  if (!vaidationResult.success) {
    return Response.json(vaidationResult.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  data.userId = req.cookies.get("userId")?.value;
  const result = await Todo.create(data);
  revalidatePath("/api/todos");
  return Response.json(result, { status: 201 });
}
