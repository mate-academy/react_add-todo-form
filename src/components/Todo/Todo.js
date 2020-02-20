import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ id, title, user }) => (
  <li key={id} className="todo">
    <p className="title">{`${title}`}</p>
    <p className="name">{user.name}</p>
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Todo;
