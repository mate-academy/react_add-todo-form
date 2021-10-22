import React from 'react';
import classNames from 'classnames';
import { Todo } from './Todo';
import users from './api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const user = users.find(({ id }) => id === todo.userId);

  return (
    <li
      className={classNames((todo.completed ? 'todo-done' : 'todo-undone'), 'list-group-item')}
      key={todo.id}
    >
      <div>
        {user?.email}
      </div>
      {todo.title}
      <span>
        {todo.completed
          ? ' Done!'
          : ' Need to be done!'}
      </span>
    </li>
  );
};
