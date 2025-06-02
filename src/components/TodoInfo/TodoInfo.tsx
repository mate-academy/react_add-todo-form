import React from 'react';
import { Todo } from '../../App'; // шлях може бути іншим, залежно від структури

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div className="TodoInfo" data-id={todo.id}>
      <h3>{todo.title}</h3>
      <p>
        <strong>User:</strong> {todo.user.name} ({todo.user.email})
      </p>
      <p>
        <strong>Status:</strong> {todo.completed ? 'Completed' : 'Incomplete'}
      </p>
    </div>
  );
};
