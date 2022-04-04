import React from 'react';
import './TodoList.scss';

import { PreparedTodo } from '../../types/PreparedTodo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoInfo todo={todo} />
    ))}
  </ul>
);
