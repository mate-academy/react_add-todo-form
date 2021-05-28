import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ id, title, user }) => (
  <li
    className="todo__item"
    key={id}
  >
    {title}
    {' - '}
    <b>{user.name}</b>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
