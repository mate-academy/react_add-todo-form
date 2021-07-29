import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="todo">
    <h2>{title}</h2>
    <hr color={completed ? 'green' : 'red'} />
    <User user={user} />
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
