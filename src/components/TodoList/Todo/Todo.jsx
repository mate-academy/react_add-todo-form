import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <User name={user.name} />
    <p>{title}</p>
    <p>
      {completed
        ? 'Completed'
        : 'Not completed yet!'}
    </p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Todo.defaultProps = {
  completed: false,
};
