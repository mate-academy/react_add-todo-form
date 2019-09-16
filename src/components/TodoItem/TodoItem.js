import React from 'react';
import './TodoItem.scss';
import User from '../User/User';
import { TodoTypes } from '../../constants/proptypes';

const TodoItem = ({
  key, title, completed, user,
}) => (
  <div className="todo-item" key={key}>
    <h2 className="todo-item__title">{title}</h2>
    <p className="todo-item__check">{completed ? '\u2713' : ''}</p>
    <User {...user} />
  </div>
);

TodoItem.propTypes = TodoTypes;

export default TodoItem;
