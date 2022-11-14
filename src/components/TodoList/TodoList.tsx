import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li
        key={todo.id}
        className="TodoList"
      >
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
