import React from 'react';
import User from './User';
import './todo.scss';
import { TypeTodoItem } from '../types';

const Todo = ({ title, completed, user }) => (
  <li>
    <span className="todo__item">
      <span className="todo__item-title">ToDo: </span>
      {title}
    </span>
    <br />
    <span className="todo__item-title">
      Status:
    </span>
    {completed
      ? ' finished'
      : ' not finished'}
    <br />
    <span className="todo__item-title">
      User:
    </span>
    {' '}
    <User {...user} />
    <hr />
  </li>
);

Todo.propTypes = TypeTodoItem;

export default Todo;
