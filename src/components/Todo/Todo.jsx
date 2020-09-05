import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';
import { User } from '../User/User';

export const Todo = ({ title, completed, user }) => {
  const status = `${completed ? 'done' : 'undone'}`;

  return (
    <>
      <User {...user} />
      <p>{title}</p>
      <span className={status}>
        {status.slice(0, 1).toUpperCase() + status.slice(1)}
      </span>
    </>
  );
};

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
