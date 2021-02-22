import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({
  title,
  completed,
  user }) => (
  <>
    <p>
      <strong>Todo:</strong> {title}
      {' '}
    </p>
    <User {...user} />
    <p>
      <strong>Status:</strong> {completed ? 'complited' : 'not complited'}
    </p>
  </ >
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
