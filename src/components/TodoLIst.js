import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li
        className="todo__name"
        key={todo.id}
      >
        {` ✍️ ${todo.id}.  ${todo.title}`}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = { todos: PropTypes.arrayOf.isRequired };

export default TodoList;
