import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';
import './Todo.css';

export const Todo = ({ title, completed, user }) => (
  <div className="todo">

    <span className="todo__item">
      <strong className="todo__title">Title: </strong>
      {title}
    </span>
    <span className="todo__item">
      <strong className="todo__title">Status: </strong>
      {completed ? ' completed' : ' not completed yet'}
    </span>
    <span className="todo__item">
      <strong className="todo__title">Name: </strong>
      <User name={user.name} />
    </span>

  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
