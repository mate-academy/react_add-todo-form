import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';
import './Todo.css';

export default function Todo({ todo }) {
  return (
    <div className="container">
      <User user={todo.user} />
      <h2 className="title">
        {
          `: ${todo.title}`
        }
      </h2>
      <p className={todo.completed ? 'completed' : 'uncompleted'}>
        {
          todo.completed
            ? '✅'
            : '❌'
        }
      </p>
    </div>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
  }).isRequired,
};
