import React from 'react';
import { PreparedTodo } from '../../app.typedef';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
  } = todo;

  return (
    <div className="todo">
      <h2 data-cy="title">{title}</h2>
      <h3 data-cy="status">
        {completed
          ? ('Completed')
          : ('Not completed!')}
      </h3>
      {user && (
        <UserInfo user={user} />
      )}
    </div>
  );
};
