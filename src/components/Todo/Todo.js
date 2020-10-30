import React from 'react';
import { TodoTypes } from './TodoTypes';
import { User } from '../User';

import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="todo">
    <h4>Todo:</h4>
    <p>{title}</p>
    <h4>Status:</h4>
    <p>{completed ? 'Completed' : 'Not completed'}</p>
    <User name={user.name} />
  </div>
);

Todo.propTypes = TodoTypes;
