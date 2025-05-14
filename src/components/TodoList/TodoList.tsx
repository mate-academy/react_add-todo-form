import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}

export const TodoList: React.FC<{ todos: Todo[] }> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
