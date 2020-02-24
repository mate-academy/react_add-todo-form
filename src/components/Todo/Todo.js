import React from 'react';
import './Todo.css';
import PropTypes from 'prop-types';

export const Todo = (props) => {
  const { user, todo } = props;

  return (
    <tr className="todos__element">
      <td>{todo.id}</td>
      <td>{todo.title}</td>
      <td>{user.name}</td>
      <td>{todo.completed ? 'completed' : 'pending'}</td>
    </tr>
  );
};

Todo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
