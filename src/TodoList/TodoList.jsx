import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="container">
    {todos.map(user => (
      <div key={user.id} className="container__box">
        <p className="container__title">
          Name:
          {' '}
          <span className="container__text">
            {user.user}
          </span>
        </p>
        <p className="container__title">
          Title:
          {' '}
          <span className="container__text">
            {user.title}
          </span>
        </p>
        <p className="container__title">
          Completed:
          {' '}
          {user.completed
            ? <span className="container__text">Yes</span>
            : <span className="container__text">No</span>
          }
        </p>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};
