import React from 'react';
import { Todo } from '../../type/types';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <>
      <h2 className="Todo__title">{ title }</h2>

      <span>
        { completed ? 'completed' : 'open' }
      </span>
    </>
  );
};
