import { User } from '../../Types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: {
    user: User | null;
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
