import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

const TodoItem = ({ todo }) => (
  <div className={todo.completed}>
    <h3>{todo.title}</h3>
    <User
      person={todo.user}
    />
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
