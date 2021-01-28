import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodosList = ({ todos, deleteTask, renameTask }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className="item">
        <Todo
          todo={todo}
          deleteTask={deleteTask}
          renameTask={renameTask}
        />
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  deleteTask: PropTypes.objectOf.isRequired,
  renameTask: PropTypes.objectOf.isRequired,
};
