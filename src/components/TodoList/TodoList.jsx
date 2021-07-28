import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './todoList.scss';

export const TodoList = ({ todoList }) => (
  <ul className="todoList">
    {todoList.map(todo => (
      <li key={todo.id} className="todoList__item">
        <span className="todoList__name">
          Name: <strong>{todo.user.name}</strong>
        </span>
        <div
          className={ classNames('todoList__content',
            { todoList__completed: todo.completed },
            { todoList__failed: !todo.completed },
          )}
        >
          {todo.title}
          {todo.completed && <span>&#9745; </span>}
          {!todo.completed && <span>&#10008; </span>}
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })).isRequired,
};