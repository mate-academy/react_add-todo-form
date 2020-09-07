import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ title, completed, user }) => (
  <li className="item">
    <User {...user} />
    <p>{title}</p>
    <p className={`item__${completed ? 'ready' : 'not-ready'}`}>
      {completed
        ? 'ready'
        : 'not ready'}
    </p>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
