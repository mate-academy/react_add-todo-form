import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Array<{
    id: number;
    title: string;
    completed: boolean;
    user: {
      name: string;
      email: string;
    };
  }>;
}

export const TodoList = ({ todos }: Props) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
