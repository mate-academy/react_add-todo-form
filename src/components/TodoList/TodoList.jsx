import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.length ? (todos.map(todo => (
      <li key={todo.id}>
        {todo.id}
        .
        {' '}
        {todo.title}
        {' '}
        |
        {' '}
        {users.find(user => user.id === todo.userId).username}
      </li>
    ))) : 'there are no todos'}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
};
