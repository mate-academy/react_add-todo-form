import React from 'react';
import { Todos } from '../../types/type';

type Props = {
  todo: Todos
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
