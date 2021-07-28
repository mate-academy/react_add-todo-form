import React from 'react';
import './Todo.scss';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <div className="toDoItem">
    <p>{title}</p>
    <p>{`Already complete: ${completed}`}</p>
    <p className="toDoItem__userName">{user}</p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
