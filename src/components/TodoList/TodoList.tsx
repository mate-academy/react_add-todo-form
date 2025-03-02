import { TodoWithUser } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUser[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(el => (
        <TodoInfo key={el.id} todo={el} />
      ))}
    </section>
  );
};
