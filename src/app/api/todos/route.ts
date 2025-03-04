import Todo from "@/app/models/Todo";
import { z } from "zod";

const schema = z.object({
  title: z.string().nonempty(),
  deadline: z.string().nonempty(),
});

export async function GET() {
  const todos = await Todo.findAll();
  return Response.json(todos, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();

  const vaidationResult = schema.safeParse(data);

  if (!vaidationResult.success) {
    return Response.json(vaidationResult.error.flatten().fieldErrors, {
      status: 400,
    });
  }

  const result = await Todo.create(data);
  return Response.json(result, { status: 201 });
}
