import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';
import classNames from 'classnames';

export const Todo = ({ title, completed, user }) => (
  <div className="Todo">
    <h2 className="Todo__title">
      {title}
    </h2>
    <p className="Todo__user">{user.name}</p>

    <span
      className={classNames('Todo__status', {
        '--done': completed,
      })}
    >
      {completed ? 'completed ' : 'in progress'}
    </span>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
};
