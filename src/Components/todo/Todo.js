import React from 'react';
import './Todo.css';
import { User } from './User';
import { ShapeTodo } from '../Shapes/ShapeTodo';

export const Todo = ({ todoItem }) => (
  <li className="list-group-item d-flex justify-content-around">
    <span className="todo__item">{todoItem.title}</span>
    <User user={todoItem.user} />
  </li>
);

Todo.propTypes = ShapeTodo.isRequired;
