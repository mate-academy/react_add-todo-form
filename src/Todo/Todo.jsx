import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

import './Todo.css';

export const Todo = ({ todo }) => (
  <>
    <span className="list__title">
      {todo.title}
    </span>
    <span className="list__completed">
      {todo.completed ? '✔' : '✘'}
    </span>
    <User userName={todo.user.name} />
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
};

Todo.defaultProps = {
  todo: {
    user: null,
  },
};
