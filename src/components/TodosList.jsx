import React from 'react';
import PropTypes from 'prop-types';
import './TodosList.css';

export const TodosList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id} className="item">
        <div className="title">
          <strong>Name:</strong>
          {' '}
          {todo.user}
        </div>
        <div className="title">
          <strong>Task:</strong>
          {' '}
          {todo.title}
        </div>
        <div className="title">
          <strong>Status:</strong>
          {todo.completed ? 'Finished' : 'Unfinished'}
        </div>
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
};

TodosList.defaultProps = {
  todos: [],
};
