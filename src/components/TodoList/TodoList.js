import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
