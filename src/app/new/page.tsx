import prisma from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";
export default function page() {
    async function createTodo(data: FormData ){
        // return prisma.todo.create 
        "use server"
        const title = data.get("title")?.valueOf()
        if(typeof title !== "string" || title.length === 0){
            throw new Error("Invalid Title")
        }
        await prisma.todo.create({data:{title , complete:false}})
        redirect("/")
        
    }
  return (
    <>
      <header
        className="flex justify-between
  items-center mb-4"
      >
        <h1 className="text-2xl ">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
       
        <div className="flex gap-1 justify-end">
        <Link href=".." className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">Cancel</Link>
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Create</button>
        </div>
      </form>
    </>
  )
}
