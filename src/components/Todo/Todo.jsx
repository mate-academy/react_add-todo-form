import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed }) => (
  <>
    <div className="item-title">{title}</div>
    <span className="item-status">
      {completed ? 'Completed' : 'In Progress'}
    </span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
