import React from 'react';

import { TodoInfo } from '../TodoInfo';

import Todo from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="w-50 mx-auto">
    {todos.map((todo) => (
      <li key={todo.id} className="mb-3">
        <TodoInfo
          title={todo.title}
          completed={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
