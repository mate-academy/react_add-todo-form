import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, id, userId }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{completed ? 'Done' : '-'}</td>
    <td>{userId}</td>
  </tr>
);

Todo.propTypes = {
  userId: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
