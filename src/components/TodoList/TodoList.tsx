import React from 'react';
import { TodoInfo } from '../TodoInfo'; // або '../TodoInfo.tsx' — залежно від структури

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
