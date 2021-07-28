import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <>
    <span
      className={`${completed ? 'color__true' : 'color__false'}`}
    >
      {title}
    </span>
    {' --- '}
    <span className="color__boolean">{`${completed}`}</span>
    {' --- '}
    <span className="name-style">{user.name}</span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
