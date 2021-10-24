import React from 'react';
// import users from '../api/users';
import { Todo } from './Todo';

export const TodoInfo: React.FC<Todo> = ({ title, user, completed }) => {
  return (
    <>
      <div>
        <div>{title}</div>
        <div>{user?.name}</div>
        <div>{completed ? 'done' : 'not done'}</div>
      </div>
      <br />
    </>
  );
};
