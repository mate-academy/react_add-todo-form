import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  readyTodos: Todo[],
}

export const TodoList = React.memo<Props>(
  ({ readyTodos }) => (
    <ul className="todo-list">
      {readyTodos.map(({
        id,
        title,
        completed,
        user,
      }) => (
        <li
          key={id}
          className="todo-list__list-item"
        >
          {title}
          <br />
          Completed:
          <input
            type="checkbox"
            defaultChecked={completed}
          />
          <br />
          {user.name}
          {' | '}
          {user.email}
        </li>
      ))}
    </ul>
  ),
);
