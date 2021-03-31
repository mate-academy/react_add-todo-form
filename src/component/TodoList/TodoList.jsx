import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todoList }) => (
  <ul className="todo-list">
    {todoList.map(todo => (
      <li
        className="todo-list__item"
        key={todo.id}
      >
        <span className="todo-list__title">{todo.title}</span>
        <span className="todo-list__user">{todo.name}</span>
        <span className="todo-list__completed">
          {`Completed: ${(todo.completed) ? 'true' : 'false'}`}
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
