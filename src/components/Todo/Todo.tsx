import React from 'react';
import { TypeTodo } from '../../types';

import './Todo.scss';

const Todo: React.FC<TypeTodo> = ({ title, completed, user }) => {
  return (
    <>
      <h3>{title}</h3>
      <span>
        {'Completed: '}
        {completed ? 'yes' : 'no'}
        <br />
        <span className="user">{user.name}</span>
      </span>
    </>
  );
};

export { Todo };
