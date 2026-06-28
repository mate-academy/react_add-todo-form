import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
