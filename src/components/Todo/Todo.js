import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

export const Todo = ({ todo }) => {
  const { title, userId, id } = todo;

  return (
    <tr>
      <td className="tableCell">{id}</td>
      <td className="tableCell tableCell-title">{title}</td>
      <td className="tableCell">{userId}</td>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
};
