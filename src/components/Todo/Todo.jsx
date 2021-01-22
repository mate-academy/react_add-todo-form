import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <li className="list__item">
    <span>{user}</span>
    <span>{title}</span>
    <span>{completed ? 'completed' : 'uncompleted'}</span>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
