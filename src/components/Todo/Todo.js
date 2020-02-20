import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User/User';

export const Todo = ({ todo }) => {
  const { title, user, userId } = todo;

  return (
    <tr>
      <td>{userId}</td>
      <td>
        <User user={user} />
      </td>
      <td>{title}</td>
    </tr>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
