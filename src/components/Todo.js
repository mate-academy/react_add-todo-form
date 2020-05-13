import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ title, completed, user }) => (
  <div className="todo">
    <p className={completed ? 'completed' : 'in-progress'}>{title}</p>
    <User name={user} />
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
