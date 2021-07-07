import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export const Todo = ({ id, title, userId }) => (
  <div className="todo__content">
    <span>{id}</span>
    <span>{title}</span>
    <span>
      User id:
      {userId}
    </span>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};
