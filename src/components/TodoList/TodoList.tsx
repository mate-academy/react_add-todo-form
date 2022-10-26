import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map((todo) => (
      <li
        key={todo.id}
        className={classNames('message', {
          'is-primary': todo.completed,
          'is-warning': !todo.completed,
        })}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
