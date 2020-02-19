import React from 'react';
import PropTypes from 'prop-types';

export function Todo({ todo }) {
  return (
    <tr>
      <td className="ceil">{todo.id}</td>
      <td className="ceil">{todo.title}</td>
      <td className="ceil">{todo.user.name}</td>
    </tr>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
