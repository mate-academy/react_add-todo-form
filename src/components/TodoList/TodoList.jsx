import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const TodoList = ({ todoList }) => (
  <div>
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>
          <User {...todo.user} />
          <p><u>{todo.title}</u></p>
          <h3>{` Status: ${todo.completed}`}</h3>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
