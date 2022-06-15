import React from 'react';

import { PreparedTodos } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  prepared: PreparedTodos[],
};

export const TodoList: React.FC<Props> = ({ prepared }) => {
  return (
    <>
      {prepared.map((todo: PreparedTodos) => (
        <div>
          <TodoInfo prepared={todo} />
        </div>
      ))}
    </>
  );
};

// Create a `TodoList` component accepting an array of `preparedTodos` and
// rendering them as a list

// Add a default export statement for TodoInfo component to use it in the other files
