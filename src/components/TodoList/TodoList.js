import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <span>{todo.title}</span>
        <br />
        <span>{todo.user.name}</span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
