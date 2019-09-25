import React from 'react';
import classNames from 'classnames';
import User from '../User/User';
import { TodoItemProps } from '../../constants/proptypes';

import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const {
    title, completed = false, user, id,
  } = todo;

  const classes = classNames({
    'todo-list-item': true,
    'todo-list-item todo-list-item--done': completed,
  });

  return (
    <span className={classes}>
      <span className="todo-list-item__id">{id}</span>
      <User user={user} />
      <span className="todo-list-item__name">{title}</span>
    </span>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
