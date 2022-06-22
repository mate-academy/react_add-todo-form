import React from 'react';
import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../../typedefs';

type Props = {
  todo: PreparedTodo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <div>
      <h3 data-cy="title">{title}</h3>
      <p data-cy="status">{completed ? 'Completed' : 'Not completed!'}</p>
      {user && (
        <p><UserInfo user={user} /></p>
      )}
    </div>
  );
};
