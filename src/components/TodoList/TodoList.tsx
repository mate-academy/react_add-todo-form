import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todosFromServer: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todosFromServer = [] }) => (
    <ul className="TodoList">
      {todosFromServer.map((todo) => (
        <li
          className={classNames(
            'TodoInfo',
            {
              'TodoInfo--completed': todo.completed,
            },
          )}
          key={todo.id}
          data-id={todo.id}
        >
          <TodoInfo
            title={todo.title}
            user={todo.user}
          />
        </li>
      ))}
    </ul>
  ),
);
