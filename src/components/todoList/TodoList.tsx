import classNames from 'classnames';
import { TodoInfo } from '../todoInfo/TodoInfo';
import { Todo } from '../../types/Todo';

import './TodoList.scss';

type Props = {
  preparedTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodos }) => (
  <ul className="todo-list">
    {preparedTodos.map(todo => (
      <li
        className={classNames('todo-list__item', { active: todo.completed })}
        key={todo.id}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
