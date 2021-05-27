import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="Todo">
    <h2 className="Todo__title">
      {title}
    </h2>
    <p className="Todo__user">{user.name}</p>
    {completed
      ? (
        <span
          className="Todo__status Todo__status--done"
        >
          completed
        </span>
      )
      : (
        <span
          className="Todo__status Todo__status--not-done"
        >
          not completed
        </span>
      )
    }
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};
