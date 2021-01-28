import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <div className="card">
    {todos.map(task => (
      <Todo task={task} key={task.id} />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
