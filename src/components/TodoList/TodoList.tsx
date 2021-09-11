import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoInfo } from '../TodoInfo';
import { PreparedTodo } from '../../types/PreparedTodo/PreparedTodo';

import './TodoList.scss';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames(
          'todoList__item',
          {
            'todoList__item--done': todo.completed,
          },
        )}
      >
        {todo.user && <UserInfo user={todo.user} />}
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
