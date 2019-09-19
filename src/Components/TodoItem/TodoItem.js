import React from 'react';
import { TodoItemProps } from '../PropTypes/PropTypes';
import UserComponent from '../User/User';
import './TodoItem.css';

const TodoItem = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <div className="todo-item">
      <p className="todo-item__title">{id}</p>
      <p className="todo-item__main-title">{title}</p>
      <UserComponent user={user} />
    </div>
  );
};

TodoItem.propTypes = TodoItemProps;

export default TodoItem;
