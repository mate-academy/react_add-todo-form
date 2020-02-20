import React from 'react';
import PropTypes from 'prop-types';

export function Todo({ todo, user }) {
  return (
    <tr>
      <td className="ceil">{todo.id}</td>
      <td className="ceil">{todo.title}</td>
      <td className="ceil">{user.name}</td>
    </tr>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
