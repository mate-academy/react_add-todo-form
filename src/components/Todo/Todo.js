import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({ title, completed, ...user }) => (
  <div className="todo">
    <div className="title">{title}</div>

    <button
      type="button"
      className={`status ${completed ? 'completed' : null}`}
      onClick={(event) => {
        event.target.classList.toggle('completed');
      }}
    />

    <User {...user} />
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
