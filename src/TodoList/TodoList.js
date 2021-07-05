import React from 'react';
import './TodoList.css';

import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul className="list-of-todos">
    {todos.map(todo => (
      <li key={todo.id} className="list-of-todos__todo">
        <p>
          Task:
          {todo.title}
        </p>
        <p>
          To:
          {todo.user.name}
        </p>
        <p>
          Status:
          {todo.completed ? <span>Done</span> : <span>in process</span>}
        </p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  })),
};
