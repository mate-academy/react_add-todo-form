import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

import './TodoInfo.scss';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <>
      <h2 className="todo__title">{title}</h2>
      {user && (
        <ul className="todo__user-info">
          <li>{user.name}</li>
          <li>{user.username}</li>
          <li>{user.email}</li>
        </ul>
      )}
      <p className={classNames('todo__is-completed', { active: completed })}>
        {completed ? 'Completed' : 'Not completed'}
      </p>
    </>
  );
};
