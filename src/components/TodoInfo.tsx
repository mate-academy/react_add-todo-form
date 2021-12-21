import React from 'react';
import { Todo } from '../types';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <div>
    <h3>
      {todo.title}
    </h3>

    <p>
      {todo.completed ? 'Completed' : 'Not completed'}
    </p>

    {todo.user && (
      <p>
        {`${todo.user.name}, ${todo.user.email}`}
      </p>
    )}
  </div>
);
