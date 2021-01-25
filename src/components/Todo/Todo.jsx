import React from 'react';
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
      <div className="user__name">
        <b>Name</b>
        {': '}
        {`${user.name}`}
      </div>

      <input
        type="checkbox"
        className="checkbox"
      />
    </div>
  </div>
);

Todo.propTypes = TodoType.isRequired;
