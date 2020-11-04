import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

export const Todo = ({ title, user, completed }) => (
  <li className="Todo">
    <h3 className="Todo-title">{title}</h3>
    <p className="Todo-user">
      <span>User:</span>
      {user.name}
    </p>
    <span className={
      completed
        ? 'Todo-status completed'
        : 'Todo-status'
    }
    >
      {completed
        ? 'solved'
        : 'in process'
      }
    </span>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape(UserShape).isRequired,
  completed: PropTypes.bool.isRequired,
};
