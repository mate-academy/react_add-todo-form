import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li className="todo-list__item" key={uuidv4()}>
        <span>
          {todo.id}
        </span>
        <span
          className="todo-list__title"
        >
          {todo.title}
        </span>
        <span
          className="todo-list__name"
        >
          {todo.user.name}
        </span>
        <span
          className="todo-list__completed"
        >
          {`Completed: ${todo.completed}`}
        </span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
