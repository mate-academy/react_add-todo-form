import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';

export const TodoList = ({ todoList }) => (
  <ul className="list">
    {todoList.map(todo => (
      <li
        className="list__item"
        key={todo.id}
      >
        <span className="list__text">{todo.title}</span>
        <span className="list__text">{todo.name}</span>
        <span className="list__text">
          {`Completed: ${todo.completed}`}
        </span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
