import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todoList }) => (
  <>
    {todoList.map(todo => (
      <li
        className="list__item"
        key={todo.id}
      >
        {todo.title}
      </li>
    ))}
  </>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
