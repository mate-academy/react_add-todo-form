import { TODO } from '../../types/TODO';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: TODO[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <li>
          <TodoInfo key={todo.id} todo={todo} />
        </li>
      ))}
    </section>
  );
};
