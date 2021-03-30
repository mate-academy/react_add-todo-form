import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todos">
    {todos.map(todo => (
      <li key={todo.id} className="todos__list">
        Name:&nbsp;
        {todo.user.name}
        {<br />}
        {<br />}
        To do:&nbsp;
        {' '}
        {todo.title}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
};
