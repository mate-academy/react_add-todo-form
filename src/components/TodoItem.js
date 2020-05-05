import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
// import { User } from './User';

export const TodoItem = ({ title, completed, user, id }) => (
  <li className={completed ? 'item item--true' : 'item'}>
    {user.name}
    <p>
      id:
      {id}
    </p>
    <p>{title[0].toUpperCase() + title.slice(1)}</p>
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,

  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
