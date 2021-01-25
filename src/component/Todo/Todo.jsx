import React from 'react';

export const Todo = (todo) => {
  const { title, completed, users } = todo;

  return (
    <li className="content">
      <p className="todos__title">
        Title -
        {title}
      </p>
      <p className="todos__completed">
        {completed ? 'Completed' : 'Not completed'}
      </p>
      <p className="todos__name">
        <strong>
          User name-
          {users}
        </strong>
      </p>
    </li>
  );
};
