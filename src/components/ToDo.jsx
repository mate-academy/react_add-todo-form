import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ title, completed, user }) => (
  <>
    <span className="title">{title}</span>
    {' '}
    <span className={completed ? 'tick' : 'cross'}>
      {completed ? '✔️' : '❌'}
    </span>
    <User {...user} />
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape.isRequired,
};
