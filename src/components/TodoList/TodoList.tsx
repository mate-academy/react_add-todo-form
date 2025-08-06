import { TodoInfo } from "../TodoInfo"; 

interface Todo {
  id: number
  title: string
  userId: number
  completed: boolean
  user: { id: number; name: string; username: string; email: string }
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {

  return (
    <div>
  {todos.map(todo => (
    <TodoInfo key={todo.id} todo={todo} />
  ))}
</div>
  )

};
