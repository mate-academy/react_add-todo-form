import React from 'react';
import './TodoList.scss';

import { PrepTodo } from '../../react-app-env';

import { TodoItem } from '../TodoItem';

interface Props {
  todos: PrepTodo[]
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="list__item"
      >
        <TodoItem todo={todo} />
      </li>
    ))}
  </ul>
);
