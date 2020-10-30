import React from 'react';
import { TodoShape } from '../../Shapes/TodoShape';
import './Todo.css';

export const Todo = ({ todo }) => (
  <li
    key={todo.id}
    className="todo"
  >
    <div className="todo__item">
      {'User: '}
      {todo.user}
    </div>
    <div className="todo__item">
      {'To do: '}
      {todo.title}
    </div>
    <div className="todo__item">
      {'Completed: '}
      {todo.completed
        ? 'yes'
        : 'no'}
    </div>
  </li>
);

Todo.propTypes = TodoShape;
