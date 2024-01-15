import { TodoInfo } from '../TodoInfo';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map((todo) => (
      <TodoInfo key={todo.id} todo={todo} users={users} />
    ))}
  </section>
);
