import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todos = {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todos[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {
      todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))
    }
  </section>
);
