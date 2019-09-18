import React from 'react';

import { TodoItemProps } from '../PropTypes/PropTypes';

import './TodoItem.css';
import User from '../User/User';

const TodoItem = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <div className="ui card todo-item">
      <div className="content">
        <span className="header todo-item__id">{id}</span>
        <h2 className="header todo-item__title">{title}</h2>
        <User user={user} />
      </div>
    </div>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
