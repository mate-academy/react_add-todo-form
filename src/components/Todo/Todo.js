import React from 'react';
import './Todo.scss';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <div className="todo-container">
    <h2>{title}</h2>
    {completed === true ? 'Done' : 'Unfinished'}
    <User {...user} />
  </div>
);

Todo.defaultProps = {
  completed: false,
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
