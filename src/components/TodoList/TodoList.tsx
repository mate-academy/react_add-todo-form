import { TodoInfo } from '../TodoInfo';
import { User } from '../UserInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
