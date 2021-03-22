import PropTypes from 'prop-types';
import React from 'react';

export const Todo = ({ title, user, completed }) => (
  <>
    <h3>{title}</h3>
    <p>{`Completed ${completed}`}</p>
    <p>{user}</p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
