import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/Todos';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <ul className="TodoList">
    {todos.map((todo) => (
      <li
        key={todo.id}
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
