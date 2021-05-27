import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoList.scss';

export const TodosList = ({ todos }) => (
  <ul className="todos-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todo-item"
      >
        <div className="todo-item-id">
          <div className={classNames('todo-item-id', {
            'todo-item-id--done': todo.completed,
          })}
          >
            {todo.id}
          </div>
        </div>
        <div className="todo-item-content">
          <h2 className="todo-item-title">
            {' '}
            {todo.title}
          </h2>
          <p className="todo-item-user">
            Autor:
            {' '}
            {todo.user.name}
          </p>
        </div>
      </li>
    ))}
  </ul>
);

TodosList.defaultProps = {
  todos: [],
};

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })),
};
