import React from 'react';
import { Todo } from '../TodoList';

type Props = {
  todo: Todo;
};

const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <p>User: {todo.user}</p> {/* Ensure todo.user is accessed here */}
    </div>
  );
};

export default TodoInfo;
