import React from 'react';

import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <>
      <p>{todo.title}</p>
      <p>{todo.completed ? 'Done' : 'In Progress'}</p>
    </>
  );
};
