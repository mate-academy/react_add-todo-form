import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title } = todo;

  return (
    <>
      <p>
        <b>Title:</b>
        {' '}
        {title}
      </p>
    </>
  );
};
