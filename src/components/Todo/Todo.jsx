import React from 'react';
import { User } from '../User/User';
import { TodoType } from '../../types';
import './Todo.css';

export const Todo = ({ title, user }) => (
  <div className="todo">
    <h3 className="todo__title">
      <b>Task</b>
      {' : '}
      {`${title}`}
    </h3>

    <div className="todo__status">
      <User {...user} />

      <input
        type="checkbox"
        className="checkbox"
      />
    </div>
  </div>
);

Todo.propTypes = TodoType.isRequired;
