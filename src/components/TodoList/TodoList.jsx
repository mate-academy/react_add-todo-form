import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export const TodoList = ({ todos }) => (
  <ol>
    {todos.map(todo => (
      <li
        key={uuidv4()}
      >
        <div>
          {todo.user.name}
        </div>
        <div>
          {todo.title}
        </div>
        <div>
          {todo.completed ? 'Done!' : 'Pending...'}
        </div>
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
