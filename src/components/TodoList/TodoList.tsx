import React from 'react';
import { TodoInfo } from '../TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos = [] }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id} className="todo-list-element">
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
