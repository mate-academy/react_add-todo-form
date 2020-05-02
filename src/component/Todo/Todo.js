import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';
import { Complited } from '../Complited/Complited';

export const Todo = ({ todo }) => (
  <>
    {todo.title}
    <Complited is={todo.completed} />
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
