import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    <li className="todo-list-item todo-list-header">
      <span>User</span>
      <span>Todo</span>
      <span>Status</span>
    </li>
    {todos.map(todo => (
      <li key={todo.id} className="todo-list-item">
        <span>{todo.user.name}</span>
        <span className="todo-text">{todo.title}</span>
        <span>
          <input
            type="checkbox"
            className="todo-list-checkbox"
            defaultChecked={todo.completed}
          />
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
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
