import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      <ul>
        {todos.map(todo => (
          <li>
            <TodoInfo todo={todo} key={todo.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
