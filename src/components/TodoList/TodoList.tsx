import { Todo } from '../../types/todos';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul>
        {todos.map(todo => (
          <li><TodoInfo key={todo.id} todo={todo} /></li>
        ))}
      </ul>
    </section>
  );
};
