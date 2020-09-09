import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li
        className="todoList__todo"
        key={todo.id}
      >
        {todo.title}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  todos: [],
};
