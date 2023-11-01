import TodoItem from "@/components/TodoItem"
import prisma from "@/db"
import Link from "next/link"

function getTodos(){
  return prisma.todo.findMany()
}

async function toggleTodo(id: string , complete:boolean ){
  "use server" 
  await prisma.todo.update({where: {id } , data: {complete}})
  console.log(id , complete);
  

}
export default async function Home() {
  const todos = await getTodos()

  return (<>
  <header className="flex justify-between
  items-center mb-4">
    <h1 className="text-2xl ">Todos</h1>
    <Link href="/new" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">New</Link>
  </header>

  <ul className="pl-4">
    {todos.map(todo =>(
     <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo}/>
    ) )}
  </ul>
  </>
  )
}
