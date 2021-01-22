import React from 'react';
import PropTypes from 'prop-types';

export const TodosList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className="item">
        <p className="title">{todo.title}</p>
        <div className="container">
          <p>{todo.name}</p>
          <p>{todo.completed ? 'finished' : 'unfinished'}</p>
        </div>
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
