import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';

import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li
        key={todo.id}
        className="todoList__item"
      >
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.objectOf(PropTypes.any).isRequired,
  })).isRequired,
};
