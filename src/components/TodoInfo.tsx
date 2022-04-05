import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    userId,
    id,
    title,
    completed,
  } = todo;

  return (
    <>
      <h1>{title}</h1>
      <p>{`UserID: ${userId}`}</p>
      <p>{`Unique ID: ${id}`}</p>
      <p>
        {completed
          ? 'Task completed'
          : 'Task not completed'}
      </p>
    </>
  );
};
