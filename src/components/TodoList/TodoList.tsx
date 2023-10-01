import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../Types/Types';

export const TodoList: React.FC<Todos> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} data-id={todo.id} />
        </li>
      ))}
    </ul>
  );
};
