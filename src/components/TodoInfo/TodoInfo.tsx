import React from 'react';
import { Todos } from '../../types/todos';

type Props = {
  todos: Todos
};

export const TodoInfo: React.FC<Props> = ({ todos }) => (
  <>
    <div data-cy="title">
      {todos.title}
    </div>
    <div hidden data-cy="status">
      {todos.completed}
    </div>
  </>
);
