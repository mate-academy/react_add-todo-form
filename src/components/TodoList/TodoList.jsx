import React from 'react';
import PropTypes from 'prop-types';

import './todoList.css';

export const TodoList = ({ todoList }) => (
  <ul className="posts-list">
    {
      todoList.map(todo => (
        <li key={todo.id} className="post">
          <span className="post__author">
            {todo.user.name}
          </span>
          <span className="post__description">
            {todo.title}
          </span>
          <span className="post__complete-status">
            {
              todo.completed
                ? 'Completed'
                : 'No completed'
            }
          </span>
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
