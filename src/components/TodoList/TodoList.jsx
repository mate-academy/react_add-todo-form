import React from 'react';
import PropTypes from 'prop-types';
import { UserType, Todo } from '../Todo';

export const TodoList = ({ preparedTodos }) => (
  <ul>
    {
    preparedTodos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))
    }
  </ul>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: UserType.isRequired,
    }).isRequired,
  ).isRequired,
};
