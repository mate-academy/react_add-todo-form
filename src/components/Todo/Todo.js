import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ user, completed, title }) => (
  <div className="todo">
    <User {...user} />
    <div className="title">
      {title}
    </div>
    <div className="status">
      {completed ? 'Completed' : 'Active'}
    </div>
  </div>
);

Todo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
