import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="card">
    <h3>
      <User {...user} />
    </h3>
    <p>{title}</p>
    <h3>{completed ? 'DONE' : 'UNDONE'}</h3>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
