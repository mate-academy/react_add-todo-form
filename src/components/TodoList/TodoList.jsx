import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todoList }) => (
  <ul>
    {
      [...todoList].map(todo => (
        <li key={todo.id}>
          {todo.user.name}
          {'-------------'}
          {todo.title}
          {'-------------'}
          {
            todo.completed
              ? 'Completed'
              : 'No completed'
          }
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
