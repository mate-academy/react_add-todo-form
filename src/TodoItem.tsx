import React from 'react';
import { Todo } from './types';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  // eslint-disable-next-line no-console
  console.log('todo', todo);

  const { title } = todo;

  return (
    <>
      <h1>{title}</h1>
    </>
  );
};
