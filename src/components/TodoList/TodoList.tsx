import users from '../../api/users';
import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
};

type TodoListProps = {
  todos: Todo[];
  users: User[];
};

export const TodoList = ({ todos }: TodoListProps) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} users={users} key={todo.id} />
    ))}
  </section>
);

export default TodoList;
