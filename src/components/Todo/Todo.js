import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({ title, completed, name, username, email }) => (
  <div className="todo">
    <div className="title">{title}</div>

    <button
      type="button"
      className={completed ? 'status completed' : 'status'}
      onClick={(event) => {
        event.target.classList.toggle('completed');
      }}
    />

    <User
      name={name}
      username={username}
      email={email}
    />
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
