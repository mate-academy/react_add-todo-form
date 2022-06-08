import React from 'react';

type Props = {
  todo: FullTodos;
};

export const Todo: React.FC<Props> = ({ todo }) => (
  <>
    <h2 className="title is-6">{todo.title}</h2>
    <p>{todo.user?.name}</p>
    <span>
      {todo.completed === false
        ? 'NOT Completed'
        : 'Completed'}
    </span>
  </>
);
