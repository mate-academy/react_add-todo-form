import React from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => {
  const { id, title, user } = todo;
  const {
    name,
    email,
    phone,
    website,
  } = user;

  return (
    <li className="todo-item">
      <p className="todo-item__title">
        <span className="digit">
          {id}
        </span>
      </p>
      <p className="todo-item__main-title">
        {title}
      </p>
      <div className="user">
        <p className="user__name">
          {name}
        </p>
        <p className="user__email">
          {email}
        </p>
        <p className="user__phone">
          {phone}
        </p>
        <p className="user__website">
          {website}
        </p>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape().isRequired,
};

export default TodoItem;
