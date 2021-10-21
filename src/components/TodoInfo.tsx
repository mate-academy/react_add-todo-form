import React from 'react';
// import users from '../api/users';
import { Todo } from './Todo';

export const TodoInfo: React.FC<Todo> = ({ title, user, completed }) => {
  const status = completed === true ? 'done' : 'not done';

  return (
    <>
      <div>
        <div>{title}</div>
        <div>{user?.name}</div>
        <div>{status}</div>
      </div>
      <br />
    </>
  );
};
