import React from 'react';
import './Todo.css';
import { User } from './User';
import { ShapeTodo } from '../Shapes/ShapeTodo';

export const Todo = ({ todoItem }) => (
  <li className="todo-list__item">
    <div className={`todo todo__done--${todoItem.completed}`}>
      <input
        className="todo__checkbox"
        type="checkbox"
        checked={todoItem.completed}
        readOnly
      />
      <span className="todo__item">{todoItem.title}</span>
      <User user={todoItem.user} />
    </div>
  </li>
);

Todo.propTypes = ShapeTodo.isRequired;
