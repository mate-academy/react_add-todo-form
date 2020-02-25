import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ todo }) => {
  const { id, title, user } = todo;

  return (
    <tr>
      <th>{id}</th>
      <th>{user.name}</th>
      <th>{title}</th>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
