import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <li className="list__item">
    <User {...user} />
    <span>{title}</span>
    <span>{completed ? 'completed' : 'uncompleted'}</span>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
