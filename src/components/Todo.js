/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ title, completed, user }) => (
  <li className="todo">
    <p className="todo__title">
      {title}
    </p>
    <User user={user} />
    <span>
      {completed
        ? (
          <p className="todo__completed">
            Completed
          </p>
        )
        : (
          <p className="todo__not-completed">
            Not completed
          </p>
        )
      }
    </span>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape.isRequired,
};
