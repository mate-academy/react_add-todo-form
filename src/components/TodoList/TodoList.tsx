import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
    id: number;
    title: string,
    completed: boolean;
    userId: number;
  }[]
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => {
  if (!todos || todos.length === 0) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
