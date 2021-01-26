import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  <ul className="todos">
    {
      todos.map(todo => (
        <Todo {...todo} />
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.object.isRequired,
    }),
  ).isRequired,
};
