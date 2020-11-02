import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(({ id, user, title }) => (
      <li
        key={id}
      >
        <span>
          {user.name}
          {` `}
        </span>
        <span>{title}</span>
        <input
          type="checkbox"
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};
