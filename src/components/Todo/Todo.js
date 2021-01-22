import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({ title, completed, user }) => (
  <div className="card">
    <User userName={user} />
    <br />
    task:
    {' '}
    {title}
    <br />
    status:
    {' '}
    {completed
      ? <span>finished</span>
      : <span>unfinished</span>}
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
