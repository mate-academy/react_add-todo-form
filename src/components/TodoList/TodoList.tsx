import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos:Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map((todo:Todo) => (
      <li
        className="todo__item"
        key={todo.id}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}

  </ul>
);
