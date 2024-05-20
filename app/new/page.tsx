import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { revalidatePath } from "next/cache";

async function createTodo(data: FormData) {
  "use server";

  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length === 0) {
    throw new Error("Invalid Title");
  }

  await prisma.todo.create({ data: { title, complete: false } });
  revalidatePath("/");
  redirect("/");
}

export default function Page() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">New Todo</h1>
      </header>
      <form action={createTodo} className="flex gap-4 flex-col">
        <input
          type="text"
          name="title"
          className="input input-bordered w-full bg-base-200 rounded px-2 py-1 focus:outline-none focus:border-primary"
        />
        <div className="flex gap-2 justify-end">
          <Link href=".." className="btn btn-secondary text-lg">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary text-lg">
            Create
          </button>
        </div>
      </form>
    </>
  );
}
