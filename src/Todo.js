import React from 'react';
import PropTypes from 'prop-types';
import { User } from './User';

export const Todo = ({ todo }) => (
  <>
    <User user={todo.user} />
    {todo.title}
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
