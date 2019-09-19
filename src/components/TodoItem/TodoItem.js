import React from 'react';

import { TodoItemProps } from '../PropTypes/PropTypes';

import './TodoItem.css';
import User from '../User/User';

const TodoItem = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <div className="card todo-item">
      <div className="content">
        <div className="header todo-item__id">{id}</div>
        <div className="header todo-item__title">{title}</div>
        <User user={user} />
      </div>
    </div>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
