import React from 'react';

import { PreparedTodos } from '../types';
import { TodoItem } from './TodoItem';

import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
  onChecked: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({ todos, onChecked }) => {
  return (
    <ul className="App__list List">
      {todos.map(todo => (
        <TodoItem todo={todo} onChecked={onChecked} />
      ))}
    </ul>
  );
};
