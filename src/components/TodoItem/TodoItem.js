import React from 'react';
import User from '../User/User';
import { TodoItemProps } from '../../constants/proptypes';

import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const {
    title, completed = false, user, id,
  } = todo;

  const classNames = !completed
    ? 'todo-list-item'
    : 'todo-list-item todo-list-item--done';

  return (
    <span className={classNames}>
      <span className="todo-list-item__id">{id}</span>
      <User user={user} />
      <span className="todo-list-item__name">{title}</span>
    </span>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
