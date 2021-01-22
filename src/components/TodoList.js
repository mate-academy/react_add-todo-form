import React from 'react';
import './TodoList.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li
        key={todo.id}
      >
        <strong>Task:</strong>
        <span className={classNames('todo', { done: todo.completed })}>
          {todo.title}
        </span>
        ----
        <strong>User:</strong>
        {' '}
        {todo.user}
        ----
        <span className={classNames('todo', { done: todo.completed })}>
          {todo.completed ? 'Done' : 'In progress'}
        </span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};
