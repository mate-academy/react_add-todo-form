import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';
import { UserShape } from '../shapes/UserShape';

function convertText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

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
        {convertText(title)}
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
  user: UserShape.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
