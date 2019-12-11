import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map(todo => (
      <li
        className="todo__content"
        key={todo.id}
      >
        {` ✍️ ${todo.id}.  ${todo.title}`}
        {''}
        <span className="todo__name">
        —
          {todo.user.name}
        </span>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = { todos: PropTypes.arrayOf.isRequired };

export default TodoList;
