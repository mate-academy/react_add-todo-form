import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      name: string;
      email: string;
      id: string;
      username: string;
    };
  }[];
};

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
