import React from 'react';
import { PreparedTodo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

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
      <h1 data-cy="title">{title}</h1>
      <h2 data-cy="status">
        {completed
          ? ('Completed')
          : ('Not completed')}
      </h2>
      {user && (
        <UserInfo user={user} />
      )}
    </div>
  );
};

// Create a `TodoInfo` component accepting a `todo` object and use it in the
// list to render `title`, `completed` status and `User`

// Add a default export statement for TodoInfo component to use it in the other files
