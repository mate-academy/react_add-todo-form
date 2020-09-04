import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import { Completed } from '../Completed/Completed';

export const Todo = ({ todo }) => (
  <>
    {todo.title}
    <Completed isCompleted={todo.completed} />
    <User userInfo={todo.user} />
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
