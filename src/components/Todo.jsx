import React from 'react';
import './Todo.css';
import { TodoShape } from './Shape';

export const Todo = ({ id, title, completed, user }) => (
  <li className="item">
    <span>
      {id}
      .
    </span>
    <span>{title}</span>
    <span>{completed ? 'completed' : 'not completed'}</span>
  </li>
);

Todo.propTypes = TodoShape.isRequired;
