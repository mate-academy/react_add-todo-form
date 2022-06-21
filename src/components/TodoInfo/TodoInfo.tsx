import React from 'react';
import { PreparedTodos } from '../../Types/Types';
import UserInfo from '../UserInfo/UserInfo';

type Props = {
  todo: PreparedTodos,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 data-cy="title" className="title is-4">
      Title:
      {' '}
      {todo.title}
    </h2>
    <span data-cy="status" className="has-text-info">
      Status:
      {' '}
      {todo.completed ? 'Completed' : 'Not completed!'}
    </span>
    {todo.user && <UserInfo user={todo.user} />}
  </>
);
