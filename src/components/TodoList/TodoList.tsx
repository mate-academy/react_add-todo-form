import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../types/Todos';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} />
    ))}
  </ul>
);
