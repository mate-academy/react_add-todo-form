import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ user, title, completed }) => (
  <li className="todo">
    <div>
      <div className="todo__title">
        User:
      </div>
      <div className="todo__info">
        {user.name}
      </div>
    </div>

    <div>
      <div className="todo__title">
        Task:
      </div>
      <div className="todo__info">
        {title.slice(0, 1).toUpperCase() + title.slice(1)}
      </div>
    </div>

    <div>
      <div className="todo__title">
        Status:
      </div>
      <div className="todo__info">
        <div
          className={
            `todo__icon ${completed ? '' : 'todo__icon--not-completed'}`
          }
        />
        <div>
          {completed ? 'Completed' : 'Not completed'}
        </div>
      </div>
    </div>
  </li>
);

Todo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
