import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li key={todo.id} className="todo__item">
        <p className="todo__title">{todo.title}</p>
        <p className="todo__name">{todo.user.name}</p>
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
      }),
    }).isRequired,
  ).isRequired,
};
