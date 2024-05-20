import Link from "next/link";
import { prisma } from "@/db";
import TodoItem from "./components/TodoItem";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
}

async function deleteTodo(id: string) {
  "use server";

  if (typeof id !== "string" || id.length === 0) {
    throw new Error("Invalid ID");
  }

  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath("/");
  redirect("/");
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Todos</h1>
        <Link href="/new" className="btn btn-primary text-xl">
          New
        </Link>
      </header>
      <ul className="space-y-4">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>
    </>
  );
}
