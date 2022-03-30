import React from 'react';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list-group list-group-numbered">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="list-group-item"
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
