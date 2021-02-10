import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';


import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <div
    className="todoList"
  >
    <h3
      className="header"
    >
      Todo List
    </h3>
    <ul>
      {todos.map(todo => (
        <li key = {todo.id}>
          <Todo todo={todo} />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
