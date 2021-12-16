import React from 'react';

import { PreparedTodos } from '../types';
import { TodoItem } from './TodoItem';

import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="App__list List">
      {todos.map(todo => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  );
};
