import React from 'react';
import classNames from 'classnames';
import { typeTodo } from '../../propTypes';
import './Todo.css';

export const Todo = ({ title, userId, completed }) => (
  <div className={classNames({
    todo: true,
    'todo--completed': completed,
  })}
  >
    <p>
      User id:
      {userId}
    </p>
    <p>
      {`Status: ${completed ? 'done' : 'in progress'}`}
    </p>
    <p>{title}</p>
  </div>
);

Todo.propTypes = typeTodo;
