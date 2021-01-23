import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <p>{`Name: ${todo.name}`}</p>
        <p>{`Task: ${todo.title}`}</p>
        <p>{`Todo id: ${todo.id}`}</p>
        <p>{`Status: ${todo.completed}`}</p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequared,
    title: PropTypes.string.isRequared,
    completed: PropTypes.bool.isRequared,
  })).isRequired,
};
