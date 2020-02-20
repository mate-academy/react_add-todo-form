import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo }) => {
  const { userId, title, id } = todo;

  return (
    <tr className="todo-list__row">
      <th className="todo-list__cell">{id}</th>
      <th className="todo-list__cell">{title}</th>
      <th className="todo-list__cell">{userId}</th>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
