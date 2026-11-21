import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }[];
};

export const TodoList = ({ todos }: Props) => {
  return (
    <section>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
