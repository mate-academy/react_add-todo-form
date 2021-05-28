import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <>
    <h3 className="todo-title">{title}</h3>
    <User {...user} />
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
