import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import { PreparedTodoType } from '../../types';

export const TodoList = ({ preparedTodos }) => (
  <ul>
    {preparedTodos.map(preparedTodo => (
      <li key={preparedTodo.id}>
        <Todo {...preparedTodo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PreparedTodoType).isRequired,
};
