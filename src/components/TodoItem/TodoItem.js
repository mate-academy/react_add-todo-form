import React from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => {
  const {
    id,
    title,
    user,
  } = todo;

  return (
    <li className="todo-item">
      <p className="todo-item__title">
        <span className="digit">
          {id}
        </span>
      </p>
      <p className="todo-item__main-title">{title}</p>
      <div className="user">
        <p className="user__name">
          {user.name}
        </p>
        <p className="user__email">
          {user.email}
        </p>
        <p className="user__phone">
          {user.phone}
        </p>
        <p className="user__website">
          {user.website}
        </p>
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
