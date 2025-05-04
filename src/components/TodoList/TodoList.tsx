import { TodoInfo } from "../TodoInfo";

interface Todo {
  id: number,
  title: string,
  userId: number,
  completed: boolean,
  user: {
    id: number
    name: string,
    username: string,
    email:string;
  }
}

interface TodoInfoPost {
  todos: Todo[];
}

export const TodoList = ({todos}: TodoInfoPost) => {
  return (
  <section className = "TodoList">
    {todos.map(todo => {
      return <TodoInfo todo={todo} key={todo.id}/>
    })}
  </section>
  )
};
