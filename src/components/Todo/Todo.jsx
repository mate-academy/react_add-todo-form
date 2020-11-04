import React from 'react';
import './Todo.css';

import { User } from '../User';
import { todoType } from '../../propTypes/todoType';

export const Todo = ({ id, title, completed, user }) => (
  <div className="todo__item">
    <div>{id}</div>
    <div>{title}</div>
    <div>{completed ? 'completed' : 'incomplete'}</div>
    <User name={user.name} />
  </div>
);

Todo.propTypes = todoType.isRequired;
