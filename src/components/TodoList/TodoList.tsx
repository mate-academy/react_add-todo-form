import { ITodoWithUser } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: ITodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList box">
      {todos?.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
