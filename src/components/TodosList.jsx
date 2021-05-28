import React from 'react';
import PropTypes from 'prop-types';
import './TodosList.css';

export const TodosList = ({ todos }) => (
  <ul className="App__list">
    {todos.map(todo => (
      <li key={todo.id} className="App__item">
        <h3>{todo.user}</h3>

        <p>{todo.title}</p>

        <span>
          {todo.completed ? ' Completed' : ' Not completed'}
        </span>
      </li>
    ))}
  </ul>
);

TodosList.defaultProps = {
  todos: [],
};

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
