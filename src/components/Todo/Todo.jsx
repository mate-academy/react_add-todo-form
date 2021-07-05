import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export const Todo = ({ todo }) => (
  <>
    <span className="title">{todo.title}</span>
    <span>{todo.completed ? 'done' : 'not-completed' }</span>
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
