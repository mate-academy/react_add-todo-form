import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todoList }) => (
  <ul className="App__todo-list list">
    {todoList.map(todo => (
      <li
        className="list__item"
        key={todo.id}
      >
        {todo.title}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
