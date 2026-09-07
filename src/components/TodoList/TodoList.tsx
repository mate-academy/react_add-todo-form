import { TodoInfo } from '../TodoInfo';

type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

type Props = {
  todos: Todo[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
