import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, user, completed }) => (
  <>
    <h3>{title}</h3>
    <p>{`complited (${completed}) `}</p>
    <p>{ user }</p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
};
