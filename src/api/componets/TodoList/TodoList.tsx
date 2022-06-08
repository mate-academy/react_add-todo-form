import React from 'react';
import { Todo } from '../../../react-app-env';
import './TodoList.css';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todos-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="list-item"
      >
        {`Task: ${todo.title}`}
        <br />
        {`Completed status: ${todo.completed ? 'completed' : 'unfinished'}`}
      </li>
    ))}
  </ul>
);
